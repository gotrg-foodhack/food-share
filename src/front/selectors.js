/* @flow */

import { compose } from 'ramda'

import type { State } from './store/reducers'

export const getOrders = (state: State) => state.orders

export const getUser = (state: State) => state.user
export const getUserId: (state: State) => * = compose(
  user => (user.status === 'logged in' ? user.id : undefined),
  getUser,
)

export const getMyOrder: (state: State) => * = compose(
  ({ orders, userId }) =>
    userId ? orders.find(order => order.members[userId]) : undefined,
  state => ({
    orders: getOrders(state),
    userId: getUserId(state),
  }),
)
