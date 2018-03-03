/* @flow */

import mongoose, { Schema } from 'mongoose'

const user = new Schema(
  {
    _id: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
)

export default mongoose.model('User', user)
