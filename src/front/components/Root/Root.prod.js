import React from 'react'
import { Provider } from 'react-redux'

import { Wrapper } from './Wrapper'
import { App } from '../App'

export const Root = ({ store }) => (
  <Provider store={store}>
    <Wrapper>
      <App />
    </Wrapper>
  </Provider>
)
