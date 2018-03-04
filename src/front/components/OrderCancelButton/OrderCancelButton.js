/* @flow */

import * as React from 'react'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import IconButton from 'material-ui/IconButton'
import ExitToApp from 'material-ui-icons/ExitToApp'

import * as actions from '../../../actions'
import * as store from '../../../front/store/reducers'
import * as selectors from '../../../front/selectors'

export const OrderCancelButton = compose(
  connect(
    (state: store.State) => ({
      currentOrderId: selectors.getMyOrderId(state),
    }),
    dispatch => ({
      cancelOrder: compose(dispatch, actions.cancelOrder),
    }),
    ({ currentOrderId }, { cancelOrder }) => ({
      onClick: currentOrderId && (() => cancelOrder(currentOrderId)),
    }),
  ),
  withProps({
    children: <ExitToApp />,
  }),
)(IconButton)
