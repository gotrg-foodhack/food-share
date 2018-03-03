import babel from 'rollup-plugin-babel'

export default {
  input: 'src/back/server.js',
  output: {
    file: 'build/back/server.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'flow',
        [
          'env',
          {
            targets: { node: 'current' },
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
    }),
  ],
}
