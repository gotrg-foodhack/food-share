/* eslint-env node */

if (process.env.NODE_ENV === 'production') {
  exports.configureStore = require('./configureStore.prod').configureStore
} else {
  exports.configureStore = require('./configureStore.dev').configureStore
}
