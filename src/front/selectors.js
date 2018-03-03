/* @flow */

import { compose } from 'ramda'

import type { State } from './store/reducers'
import type { Chat } from '../types'

export const getMapCenter = (state: State) => state.mapCenter
export const getMapCenterX = compose(coords => coords.x, getMapCenter)
export const getMapCenterY = compose(coords => coords.y, getMapCenter)

export const getMapCenterPoint = (state: State): [number, number] => [
  getMapCenterX(state),
  getMapCenterY(state),
]

export const getSelfPosition = (state: State) => state.selfPosition
export const getSelfPositionX = compose(coords => coords.x, getSelfPosition)
export const getSelfPositionY = compose(coords => coords.y, getSelfPosition)

export const getSelfPositionPoint = (state: State): [number, number] => [
  getSelfPositionX(state),
  getSelfPositionY(state),
]

export const getOrders = (state: State) => state.orders

export const getUser = (state: State) => state.user
export const getUserStatus: (state: State) => * = compose(
  user => user.status,
  getUser,
)
export const isLoggedIn: (state: State) => * = compose(
  status => status === 'logged in',
  getUserStatus,
)
export const getUserId: (state: State) => * = compose(
  user => (user.status === 'logged in' ? user.id : undefined),
  getUser,
)
export const getUserName: (state: State) => * = compose(
  user => (user.status === 'logged in' ? user.username : undefined),
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

export const getMyOrderMembers: (state: State) => * = compose(
  order => (order ? order.members : {}),
  getMyOrder,
)

export const getMyOrderCartItems: (state: State) => * = compose(
  order => (order ? order.cartItems : {}),
  getMyOrder,
)

export const getMyOrderChat: (state: State) => Chat = compose(
  order => (order ? order.chat : []),
  getMyOrder,
)

export const haveActiveOrder: (state: State) => * = compose(Boolean, getMyOrder)

export const getMyOrderId: (state: State) => * = compose(
  order => order && order.id,
  getMyOrder,
)

export const isIOwner: (state: State) => * = compose(
  ({ myOrder, userId }) => !!(myOrder && myOrder.id === userId),
  state => ({
    myOrder: getMyOrder(state),
    userId: getUserId(state),
  }),
)
