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

app.use(express.static(staticPath))

type CreateListener = (
  dispatch: <A: actions.Action>(action: A) => A,
) => (action: actions.Action, state: State) => Promise<void>

const createListener: CreateListener = () => async action => {
  switch (action.type) {
    case 'login': {
      // do anything
    }
  }
}

io.on('connection', socket => {
  const dispatch = <A: actions.Action>(action: A): A => {
    socket.emit('action', action)
    return action
  }

  socket.on('action', createListener(dispatch))
})

server.listen(PORT)
