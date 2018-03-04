/* @flow */

// $FlowFixMe
import { Server } from 'http'
import { resolve } from 'path'

import dotenv from 'dotenv'
import socketIO from 'socket.io'
import express from 'express'
import { toPairs } from 'ramda'

import * as actions from '../actions'
// eslint-disable-next-line prettier/prettier
/* :: import * as types from '../types' */
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

const getOrderById = async (id: string): Promise<?types.Order> => {
  const order: ?types.Order = await Order.findById(id).exec()

  return (
    order && {
      id: order.id,
      coords: order.coords,
      owner: order.owner,
      members: order.members,
      cartItems: order.cartItems,
      chat: order.chat,
    }
  )
}

const removeFromObj = <O>(obj: O, idForRemove): O => {
  const clone = { ...obj }
  delete clone[idForRemove]
  return clone
}

const randomPayDelay = () => Math.floor(Math.random() * 5000)

type CreateListener = (
  dispatch: <A: actions.Action>(action: A, broadcast?: boolean) => A,
  socket: Object,
) => (action: actions.Action, state: State) => Promise<void>

const createListener: CreateListener = (dispatch, socket) => async (
  action: actions.Action,
) => {
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

        const orders = await getAllOrders()

        dispatch(actions.ordersUpdate(orders))
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
        dispatch(actions.ordersUpdate(orders), true)

        break
      }

      case 'order approve':
      case 'cancel order approve': {
        if (!userFromPool) return

        const order = await getOrderById(action.payload)

        if (!order) return

        const { id: orderId, members, ...orderData } = order

        const member = {
          ...members[userFromPool.id],
          approve: action.type === 'order approve',
        }

        await Order.findByIdAndUpdate(
          orderId,
          ({
            ...orderData,
            members: { ...members, [userFromPool.id]: member },
          }: types.NewOrder),
        )

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders), true)

        break
      }

      case 'order pay': {
        if (!userFromPool) return

        const order = await getOrderById(action.payload)

        if (!order) return

        const { id: orderId, members, ...orderData } = order

        toPairs(members).forEach(([userId, member]) =>
          setTimeout(async () => {
            const message: types.ChatEvent = {
              eventType: 'order pay',
              userId,
              login: member.login,
              paySum: member.readyToPaySum,
            }

            await Order.findByIdAndUpdate(
              orderId,
              ({
                ...orderData,
                members: { ...members, [userId]: member },
                chat: order.chat.concat(message),
              }: types.NewOrder),
            )

            const orders = await getAllOrders()
            dispatch(actions.ordersUpdate(orders), true)
          }, randomPayDelay()),
        )

        break
      }

      case 'set pay sum': {
        if (!userFromPool) return

        const order = await getOrderById(action.payload.orderId)

        if (!order) return

        const { id: orderId, members, ...orderData } = order

        const message: types.ChatEvent = {
          eventType: 'set pay sum',
          userId: userFromPool.id,
          login: userFromPool.username,
          paySum: action.payload.paySum,
        }

        const member = {
          ...members[userFromPool.id],
          paySum: action.payload.paySum,
        }

        await Order.findByIdAndUpdate(
          orderId,
          ({
            ...orderData,
            members: { ...members, [userFromPool.id]: member },
            chat: order.chat.concat(message),
          }: types.NewOrder),
        )

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders), true)

        break
      }

      case 'chat message': {
        if (!userFromPool) return

        const order = await getOrderById(action.payload.orderId)

        if (!order) return

        const { id: orderId, ...orderData } = order

        const message: types.ChatEvent = {
          eventType: 'message',
          userId: userFromPool.id,
          login: userFromPool.username,
          text: action.payload.message,
        }

        await Order.findByIdAndUpdate(
          orderId,
          ({
            ...orderData,
            chat: order.chat.concat(message),
          }: types.NewOrder),
        )

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders), true)

        break
      }

      case 'cancel order': {
        if (!userFromPool) return

        const order = await getOrderById(action.payload)
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

          await Order.findByIdAndUpdate(
            orderId,
            ({
              ...orderData,
              members,
              cartItems,
              chat,
            }: types.NewOrder),
          )
        }

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders), true)

        break
      }

      case 'join to order': {
        if (!userFromPool) return
        const order = await getOrderById(action.payload)
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

        await Order.findByIdAndUpdate(
          orderId,
          ({
            ...orderData,
            members: { ...order.members, [userFromPool.id]: member },
            cartItems: { ...order.cartItems, [userFromPool.id]: cartItem },
            chat: order.chat.concat(message),
          }: types.NewOrder),
        )

        const orders = await getAllOrders()
        dispatch(actions.ordersUpdate(orders), true)

        break
      }
    }
  } catch (err) {
    // $FlowFixMe
    dispatch({ type: 'error', payload: err.message })
    console.log(err)
  }
}

io.on('connection', socket => {
  const dispatch = <A: actions.Action>(action: A, toAll?: boolean): A => {
    if (toAll) io.emit('action', action)
    else socket.emit('action', action)

    return action
  }

  socket.on('action', createListener(dispatch, socket))
})

server.listen(PORT)
