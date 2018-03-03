import mongoose from 'mongoose'

const mongodbUrl = 'mongodb://db/food'

export default () =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongodbUrl, error => {
      if (error) reject(error)
      else resolve(mongoose.connection.db)
    })
  })
