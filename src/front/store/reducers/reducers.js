/* @flow */

import { combineReducers } from 'redux'

import {
  type State as SelfPosition,
  type State as MapCenter,
  position,
} from './positionReducer'

export type State = {
  selfPosition: SelfPosition,
  mapCenter: MapCenter,
}

export const rootReducer = combineReducers({
  selfPosition: position('update self position'),
  mapCenter: position('set map center'),
})
