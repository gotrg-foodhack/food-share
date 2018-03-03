/* @flow */

export type Order = {
  id: string,
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
      [productId: string]: number,
    },
  },
  chat: $ReadOnlyArray<
    | {
        eventType: 'message',
        userId: string,
        text: string,
      }
    | {
        eventType: 'add to cart' | 'remove from cart',
        userId: string,
        productId: string,
      }
    | {
        eventType: 'set pay sum' | 'increase pay sum' | 'decrease pay sum',
        userId: string,
        paySum: number,
      },
  >,
}
