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

export type State = {
  selfPosition: SelfPosition,
  mapCenter: MapCenter,
}

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

export const rootReducer = combineReducers({
  selfPosition: position('update self position'),
  mapCenter: position('set map center'),
  orders,
})
