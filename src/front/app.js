/* @flow */

import React from 'react'
import { render } from 'react-dom'

import jss from 'jss'
import preset from 'jss-preset-default'
import normalize from 'normalize-jss'

import { configureStore } from './store/configureStore'

import { Root } from './components/Root'

jss.setup(preset())
jss.createStyleSheet(normalize).attach()
jss
  .createStyleSheet({
    '@global': {
      'html, body, #root': {
        margin: 0,
        padding: 0,
        height: '100%',
      },
    },
  })
  .attach()

const store = configureStore()

render(<Root store={store} />, (document.getElementById('root'): any))

if (module.hot && typeof module.hot.accept == 'function') {
  module.hot.accept()
}
