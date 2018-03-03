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

export type Coords = {
  longitude: number,
  latitude: number,
}

export type UpdateSelfPosition = {
  type: 'update self position',
  payload: Coords,
}

export const updateSelfPosition = (payload: Coords): UpdateSelfPosition => ({
  type: 'update self position',
  payload,
})

export type SetMapCenter = {
  type: 'set map center',
  payload: Coords,
}

export const setMapCenter = (payload: Coords): SetMapCenter => ({
  type: 'set map center',
  payload,
})

export type CreateOrder = {
  type: 'create order',
  payload: Coords,
}

export const createOrder = (payload: Coords): CreateOrder => ({
  type: 'create order',
  payload,
})

export type JoinToOrder = {
  type: 'join to order',
  payload: string,
}

export const joinToOrder = (payload: string): JoinToOrder => ({
  type: 'join to order',
  payload,
})

export type CancelOrder = { type: 'cancel order' }

export const cancelOrder = (): CancelOrder => ({ type: 'cancel order' })

export type ChatMessage = {
  type: 'chat message',
  payload: string,
}

export const chatMessage = (payload: string): ChatMessage => ({
  type: 'chat message',
  payload,
})

export type AddToCart = {
  type: 'add to cart',
  payload: string,
}

export const addToCart = (payload: string): AddToCart => ({
  type: 'add to cart',
  payload,
})

export type RemoveFromCart = {
  type: 'remove from cart',
  payload: string,
}

export const removeFromCart = (payload: string): RemoveFromCart => ({
  type: 'remove from cart',
  payload,
})

export type SetPaySum = {
  type: 'set pay sum',
  payload: number,
}

export const setPaySum = (payload: number): SetPaySum => ({
  type: 'set pay sum',
  payload,
})

export type OrderApprove = { type: 'order approve' }

export const orderApprove = (): OrderApprove => ({ type: 'order approve' })

export type OrderPay = { type: 'order pay' }

export const orderPay = (): OrderPay => ({ type: 'order pay' })

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

export const orderUpdate = (
  payload: $ReadOnlyArray<types.Order>,
): OrdersUpdate => ({
  type: 'order update',
  payload,
})
