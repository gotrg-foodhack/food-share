/* @flow */

// $FlowFixMe
import { Server } from 'http'
import { resolve } from 'path'

import dotenv from 'dotenv'
import socketIO from 'socket.io'
import express from 'express'

import * as actions from '../actions'
import * as types from '../types'
import type { State } from '../front/store/reducers'
import connect from './mongo'
import User from './models/User'
import Order from './models/Order'

connect()
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err))

dotenv.config()

const PORT = process.env.PORT || '3000'

const app = express()
const server = Server(app)
const io = socketIO(server, {
  path: '/ws',
})

const staticPath = resolve(__dirname, '../../build/front')
const socketPool = new WeakMap()

app.use(express.static(staticPath))

const getAllOrders = async (): Promise<$ReadOnlyArray<types.Order>> =>
  ((await Order.find().exec()) || []).map(
    ({ id, coords, owner, members, cartItems, chat }) => ({
      id,
      coords,
      owner,
      members,
      cartItems,
      chat,
    }),
  )

const removeFromObj = (obj, idForRemove) =>
  Object.entries(obj)
    .filter(([id]) => id !== idForRemove)
    .map(([id, data]) => ({ [id]: data }))

type CreateListener = (
  dispatch: <A: actions.Action>(action: A) => A,
  socket: Object,
) => (action: actions.Action, state: State) => Promise<void>

const createListener: CreateListener = (dispatch, socket) => async action => {
  const userFromPool: ?types.User = socketPool.get(socket)

  try {
    switch (action.type) {
      case 'login': {
        const { username, password } = action.payload

        let user = await User.findOne({ username }).exec()

        if (!user) {
          console.log('user not found')
          user = await new User(action.payload).save()
        }

        if (password !== user.password) {
          dispatch(actions.loginFail())
          break
        }

        const { id } = user

        socketPool.set(socket, { id, username, password })

        dispatch(actions.loginSuccess({ id, username }))
        break
      }

      case 'create order': {
        if (!userFromPool) return

        const { id } = await Order.create({
          coords: action.payload,
          owner: userFromPool.id,
        })

        await Order.findByIdAndUpdate(
          id,
          ({
            owner: userFromPool.id,
            coords: action.payload,
            members: {
              [userFromPool.id]: {
                login: userFromPool.username,
                approve: false,
                readyToPaySum: 0,
                paid: false,
              },
            },
            cartItems: {
              [userFromPool.id]: {
                login: userFromPool.username,
                products: [],
              },
            },
            chat: [],
          }: types.NewOrder),
        )

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders))

        break
      }

      case 'cancel order': {
        if (!userFromPool) return

        const order: ?types.Order = await Order.findById(action.payload)
        if (!order) return

        if (order.owner === userFromPool.id) {
          await Order.findByIdAndRemove(order.id).exec()
        } else {
          const { id: orderId, ...orderData } = order
          const members = removeFromObj(order.members, userFromPool.id)
          const cartItems = removeFromObj(order.cartItems, userFromPool.id)
          const chat = order.chat.concat({
            eventType: 'cancel order',
            userId: userFromPool.id,
            login: userFromPool.username,
          })

          await Order.findByIdAndUpdate(orderId, {
            ...orderData,
            members,
            cartItems,
            chat,
          })
        }

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders))

        break
      }

      case 'join to order': {
        if (!userFromPool) return

        const order: ?types.Order = await Order.findById(action.payload)
        if (!order) return

        const { id: orderId, ...orderData } = order

        const member = {
          login: userFromPool.username,
          approve: false,
          readyToPaySum: 0,
          paid: false,
        }

        const cartItem = {
          login: userFromPool.username,
          products: [],
        }

        const message = {
          eventType: 'join to order',
          userId: userFromPool.id,
          login: userFromPool.username,
        }

        await Order.findByIdAndUpdate(orderId, {
          ...orderData,
          members: { ...order.members, [userFromPool.id]: member },
          cartItems: { ...order.members, [userFromPool.id]: cartItem },
          chat: order.chat.concat(message),
        })

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders))

        break
      }
    }
  } catch (err) {
    // $FlowFixMe
    dispatch({ type: 'error', payload: err.message })
  }
}

io.on('connection', socket => {
  const dispatch = <A: actions.Action>(action: A): A => {
    socket.emit('action', action)
    return action
  }

  socket.on('action', createListener(dispatch, socket))
})

server.listen(PORT)
