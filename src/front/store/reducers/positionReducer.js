/* @flow */

import * as types from '../../../types'
import * as actions from '../../../actions'

export type State = types.Coords

export const position = (type: 'update self position' | 'set map center') => (
  state: State = { x: 0, y: 0 },
  action: actions.Action,
): State => {
  switch (action.type) {
    case type:
      return action.payload

    default:
      return state
  }
}
