import { createStore, compose } from 'redux'
import { rootReducer } from '../reducers'
import { DevTools } from '../../components/DevTools'
import { enhancer as prodEnhancer } from './enhancer'

const devEnhancer = compose(prodEnhancer, DevTools.instrument())

export const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, devEnhancer)

  if (module.hot && typeof module.hot.accept == 'function') {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(
        // eslint-disable-next-line global-require
        require('../reducers').rootReducer,
      ),
    )
  }

  return store
}
