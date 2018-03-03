/* @flow */

// $FlowFixMe
import { Server } from 'http'
import { resolve } from 'path'

import dotenv from 'dotenv'
import socketIO from 'socket.io'
import express from 'express'

import * as actions from '../actions'
import type { State } from '../front/store/reducers'
import connect from './mongo'
import User from './models/User'

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

type CreateListener = (
  dispatch: <A: actions.Action>(action: A) => A,
  socket: Object,
) => (action: actions.Action, state: State) => Promise<void>

const createListener: CreateListener = (dispatch, socket) => async action => {
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
