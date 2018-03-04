/* @flow */

import * as React from 'react'
import { compose, defaultProps } from 'recompose'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'

import * as actions from '../../../actions'
import * as store from '../../../front/store/reducers'
import * as selectors from '../../../front/selectors'

export const PayButton = compose(
  (connect(
    (state: store.State) => ({
      currentOrderId: selectors.getMyOrderId(state),
      isReadyToPay: selectors.isReadyToPay(state),
    }),
    dispatch => ({
      cancelOrder: () => compose(dispatch, actions.orderPay),
    }),
    ({ currentOrderId }, { cancelOrder }) => ({
      onClick: currentOrderId && (() => cancelOrder(currentOrderId)),
    }),
  ): any),
  defaultProps({
    children: 'Оплатить',
    variant: 'raised',
    type: 'primary',
  }),
)(({ isReadyToPay, ...props }) => (isReadyToPay ? <Button {...props} /> : null))
