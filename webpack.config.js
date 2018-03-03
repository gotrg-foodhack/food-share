// eslint-disable-next-line
'use strict'

const { resolve } = require('path')
const dotenv = require('dotenv')

const {
  createConfig,
  env,

  entryPoint,
  setOutput,
  setContext,
  setDevTool,
  defineConstants,

  uglify,
  devServer,
} = require('webpack-blocks')

const babelPreset = require('./src/config/webpack/babelPreset')
const imgPreset = require('./src/config/webpack/imgPreset')
const svgPreset = require('./src/config/webpack/svgPreset')
const htmlPlugin = require('./src/config/webpack/htmlPlugin')
const clean = require('./src/config/webpack/clean')

dotenv.config()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BACK = process.env.BACK || 'https://omnomnom.stupidcat.wtf'

module.exports = createConfig([
  setContext(__dirname),
  entryPoint({ main: './src/front/app.js' }),

  setOutput({
    path: resolve(__dirname, 'build/front'),
    filename: '[name].[hash].bundle.js',
  }),

  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.BACK': process.env.BACK,
  }),

  imgPreset(),
  svgPreset(),

  babelPreset({
    test: /\.js$/,
    exclude: [resolve(__dirname, 'node_modules')],
    query: {
      babelrc: false,
      presets: [
        'flow',
        'react',
        [
          'env',
          {
            targets: {
              browsers: ['last 2 versions', 'iOS > 8'],
            },
            useBuiltIns: true,
            spec: true,
            debug: false,
            modules: false,
          },
        ],
      ],
      plugins: [
        'ramda',
        'transform-object-rest-spread',
        ['transform-class-properties', { spec: true }],
      ],
    },
  }),

  htmlPlugin({
    minify: { collapseWhitespace: true },
    template: './src/front/index.html',
  }),

  env('development', [
    setDevTool('source-map'),
    devServer({
      historyApiFallback: true,
      hot: true,
      overlay: true,
      port: 5000,
    }),
  ]),

  clean([resolve(__dirname, 'build/front')], {
    root: __dirname,
    verbose: true,
    dry: false,
  }),

  env('production', [uglify()]),
])
