/* eslint-env node */

if (process.env.NODE_ENV === 'production') {
  exports.Root = require('./Root.prod').Root
} else {
  exports.Root = require('./Root.dev').Root
}
