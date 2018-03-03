const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (dirs, config) => (context, { merge }) =>
  merge({
    plugins: [new CleanWebpackPlugin(dirs, config)],
  })
