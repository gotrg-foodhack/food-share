import React from 'react'
import { Provider } from 'react-redux'

import { DevTools } from '../DevTools'

import { Wrapper } from './Wrapper'
import { App } from '../App'

export const Root = ({ store }) => (
  <Provider store={store}>
    <Wrapper>
      <App />
      <DevTools />
    </Wrapper>
  </Provider>
)
