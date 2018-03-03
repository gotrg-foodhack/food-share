/* @flow */

import { combineReducers } from 'redux'

import * as actions from '../../../actions'
import * as types from '../../../types'
import ordersData from './data'

import {
  type State as SelfPosition,
  type State as MapCenter,
  position,
} from './positionReducer'

export type { SelfPosition, MapCenter }

export type Orders = $ReadOnlyArray<types.Order>

export const orders = (
  state: Orders = ordersData,
  action: actions.OrdersUpdate,
): Orders => {
  switch (action.type) {
    case 'order update':
      return action.payload

    default:
      return state
  }
}

export type User =
  | { status: 'not logged in' }
  | { status: 'login' }
  | {
      status: 'logged in',
      id: string,
      username: string,
    }

const user = (
  state: User = { status: 'not logged in' },
  action: actions.Action,
): User => {
  switch (action.type) {
    case 'login':
      return { status: 'login' }

    case 'login success':
      return {
        status: 'logged in',
        id: action.payload.id,
        username: action.payload.username,
      }

    case 'logout':
    case 'login fail':
    case 'logout success':
      return { status: 'not logged in' }

    default:
      return state
  }
}

export type Connection = 'connected' | 'disconnected'

const connection = (
  state: Connection = 'disconnected',
  action: actions.Action,
): Connection => {
  switch (action.type) {
    case 'socket connect':
      return 'connected'

    case 'socket disconnect':
      return 'disconnected'

    default:
      return state
  }
}

export type State = {
  selfPosition: SelfPosition,
  mapCenter: MapCenter,
  orders: Orders,
  user: User,
  connection: Connection,
}

export const rootReducer = combineReducers({
  selfPosition: position('update self position'),
  mapCenter: position('set map center'),
  orders,
  user,
  connection,
})
