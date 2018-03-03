const { resolve } = require('path')

const depsDir = resolve(__dirname, '../../../node_modules')

module.exports = ({ include, exclude = depsDir, enabled = true } = {}) => (
  context,
  { merge },
) =>
  merge({
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/i,
          include,
          exclude,
          use: [
            { loader: 'url-loader', query: { limit: 10000 } },
            {
              loader: 'img-loader',
              query: {
                enabled,
                mozjpeg: {
                  progressive: true,
                  arithmetic: false,
                  quality: 80,
                },
              },
            },
          ],
        },
      ],
    },
  })
