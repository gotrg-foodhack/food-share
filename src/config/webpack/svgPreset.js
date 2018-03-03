const { resolve } = require('path')

const depsDir = resolve(__dirname, '../../../node_modules')

module.exports = ({ include, exclude = depsDir } = {}) => (
  context,
  { merge },
) =>
  merge({
    module: {
      rules: [
        {
          test: /\.svg$/i,
          include,
          exclude,
          use: [{ loader: '@mapbox/svg-react-transformer-loader' }],
        },
      ],
    },
  })
