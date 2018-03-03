/* @flow */

import { applyMiddleware } from 'redux'
import io from 'socket.io-client'

const socket = io((process.env.BACK: any), { path: '/ws' })

export const enhancer = applyMiddleware(store => {
  socket.on('connect', () => {})
  socket.on('disconnect', () => {})

  return next => action => {
    socket.emit('action', action, store.getState())
    next(action)
  }
})
