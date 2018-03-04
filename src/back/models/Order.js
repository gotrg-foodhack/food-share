/* @flow */

import mongoose, { Schema } from 'mongoose'

const order = new Schema(
  {
    coords: { type: Object },
    owner: { type: String },
    inPayTransaction: { type: Boolean, default: false },
    members: { type: Object },
    cartItems: { type: Object },
    chat: { type: Array },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
)

export default mongoose.model('Order', order)
