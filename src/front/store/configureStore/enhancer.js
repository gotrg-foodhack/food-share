/* @flow */

import { applyMiddleware } from 'redux'
import io from 'socket.io-client'
import { compose } from 'ramda'

import { socketConnect, socketDisconnect } from '../../../actions'

const socket = io((process.env.BACK: any), { path: '/ws' })

export const enhancer = applyMiddleware(store => {
  const { dispatch } = store
  socket.on('connect', compose(dispatch, socketConnect))
  socket.on('disconnect', compose(dispatch, socketDisconnect))
  socket.on('action', action => dispatch(action))
  socket.on('action', console.log)

  return next => action => {
    socket.emit('action', action, store.getState())
    next(action)
  }
})
