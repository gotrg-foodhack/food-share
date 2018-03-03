/* @flow */

export type Coords = {
  x: number,
  y: number,
}

export type Order = {
  id: string,
  coords: Coords,
  owner: string, // User.id
  members: {
    [userId: string]: {
      approve: boolean,
      readyToPaySum: number,
      paid: boolean,
    },
  },
  cartItems: {
    [userId: string]: {
      login: string,
      products: $ReadOnlyArray<{ [productId: string]: number }>,
    },
  },
  chat: $ReadOnlyArray<
    | {
        eventType: 'message',
        userId: string,
        login: string,
        text: string,
      }
    | {
        eventType: 'add to cart' | 'remove from cart',
        userId: string,
        login: string,
        productId: string,
      }
    | {
        eventType: 'set pay sum' | 'increase pay sum' | 'decrease pay sum',
        userId: string,
        login: string,
        paySum: number,
      }
    | {
        eventType: 'order pay',
        userId: string,
        login: string,
        paySum: number,
      }
    | {
        eventType: 'cancel order',
        userId: string,
        login: string,
      },
  >,
}
