import { createStore } from 'redux'
import { enhancer } from './enhancer'

import { rootReducer } from '../reducers'

export const configureStore = initialState =>
  createStore(rootReducer, initialState, enhancer)
