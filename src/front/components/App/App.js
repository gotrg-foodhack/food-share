/* @flow */

import * as React from 'react'
import { connect } from 'react-redux'

import { Order } from '../Order'

import * as store from '../../store/reducers'
import * as selectors from '../../selectors'

import { Map } from '../Map'

export const App = connect(
  (state: store.State) => ({
    isLoggedIn: selectors.isLoggedIn(state),
    haveActiveOrder: selectors.haveActiveOrder(state),
  }),
  () => ({}), // Грязный хак. Нет времени на флоу.
)(({ isLoggedIn, haveActiveOrder }) => {
  if (!isLoggedIn) return null
  if (haveActiveOrder) return <Order />
  return <Map />
})
