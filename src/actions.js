/* @flow */

// eslint-disable-next-line
/* :: import * as types from './types' */

/* eslint-disable no-use-before-define */

export type Action =
  | SocketConnect
  | SocketDisconnect
  | UpdateSelfPosition
  | SetMapCenter
  | CreateOrder
  | JoinToOrder
  | CancelOrder
  | ChatMessage
  | AddToCart
  | RemoveFromCart
  | SetPaySum
  | OrderApprove
  | CancelOrderApprove
  | OrderPay
  | Login
  | Logout
  | LogoutSuccess
  | OrdersUpdate
  | LoginFail
  | LoginSuccess

/* eslint-enable no-use-before-define */

export type SocketConnect = { type: 'socket connect' }
export const socketConnect = (): SocketConnect => ({ type: 'socket connect' })

export type SocketDisconnect = { type: 'socket disconnect' }
export const socketDisconnect = (): SocketDisconnect => ({
  type: 'socket disconnect',
})

export type UpdateSelfPosition = {
  type: 'update self position',
  payload: types.Coords,
}

export const updateSelfPosition = (
  payload: types.Coords,
): UpdateSelfPosition => ({
  type: 'update self position',
  payload,
})

export type SetMapCenter = {
  type: 'set map center',
  payload: types.Coords,
}

export const setMapCenter = (payload: types.Coords): SetMapCenter => ({
  type: 'set map center',
  payload,
})

export type CreateOrder = {
  type: 'create order',
  payload: types.Coords,
}

export const createOrder = (payload: types.Coords): CreateOrder => ({
  type: 'create order',
  payload,
})

export type JoinToOrder = {
  type: 'join to order',
  payload: string,
}

export const joinToOrder = (orderId: string): JoinToOrder => ({
  type: 'join to order',
  payload: orderId,
})

export type CancelOrder = { type: 'cancel order', payload: string }

export const cancelOrder = (orderId: string): CancelOrder => ({
  type: 'cancel order',
  payload: orderId,
})

export type ChatMessage = {
  type: 'chat message',
  payload: { orderId: string, message: string },
}

export const chatMessage = (payload: {
  orderId: string,
  message: string,
}): ChatMessage => ({
  type: 'chat message',
  payload,
})

export type AddToCart = {
  type: 'add to cart',
  payload: { orderId: string, productId: string },
}

export const addToCart = (payload: {
  orderId: string,
  productId: string,
}): AddToCart => ({
  type: 'add to cart',
  payload,
})

export type RemoveFromCart = {
  type: 'remove from cart',
  payload: { orderId: string, productId: string },
}

export const removeFromCart = (payload: {
  orderId: string,
  productId: string,
}): RemoveFromCart => ({
  type: 'remove from cart',
  payload,
})

export type SetPaySum = {
  type: 'set pay sum',
  payload: { orderId: string, paySum: number },
}

export const setPaySum = (payload: {
  orderId: string,
  paySum: number,
}): SetPaySum => ({
  type: 'set pay sum',
  payload,
})

export type OrderApprove = { type: 'order approve', payload: string }

export const orderApprove = (orderId: string): OrderApprove => ({
  type: 'order approve',
  payload: orderId,
})

export type CancelOrderApprove = {
  type: 'cancel order approve',
  payload: string,
}

export const cancelOrderApprove = (orderId: string): CancelOrderApprove => ({
  type: 'cancel order approve',
  payload: orderId,
})

export type OrderPay = { type: 'order pay', payload: string }

export const orderPay = (orderId: string): OrderPay => ({
  type: 'order pay',
  payload: orderId,
})

export type Login = {
  type: 'login',
  payload: {
    username: string,
    password: string,
  },
}

export const login = (username: string, password: string) => ({
  type: 'login',
  payload: {
    username,
    password,
  },
})

export type Logout = { type: 'logout' }
export const logout = (): Logout => ({ type: 'logout' })

export type LoginSuccess = {
  type: 'login success',
  payload: {
    id: string,
    username: string,
  },
}

export const loginSuccess = (payload: {
  id: string,
  username: string,
}): LoginSuccess => ({
  type: 'login success',
  payload,
})

export type LoginFail = { type: 'login fail' }
export const loginFail = (): LoginFail => ({ type: 'login fail' })

export type LogoutSuccess = { type: 'logout success' }
export const logoutSuccess = (): LogoutSuccess => ({ type: 'logout success' })

export type OrdersUpdate = {
  type: 'order update',
  payload: $ReadOnlyArray<types.Order>,
}

export const ordersUpdate = (
  payload: $ReadOnlyArray<types.Order>,
): OrdersUpdate => ({
  type: 'order update',
  payload,
})
