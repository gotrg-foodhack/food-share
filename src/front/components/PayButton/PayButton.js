/* @flow */

import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'

import * as actions from '../../../actions'
import * as store from '../../../front/store/reducers'
import * as selectors from '../../../front/selectors'

export const PayButton = compose(
  connect(
    (state: store.State) => ({
      currentOrderId: selectors.getMyOrderId(state),
    }),
    dispatch => ({
      cancelOrder: () => compose(dispatch, actions.orderPay),
    }),
    ({ currentOrderId }, { cancelOrder }) => ({
      onClick: currentOrderId && (() => cancelOrder(currentOrderId)),
    }),
  ),
  withProps({
    children: 'Оплатить',
  }),
)(Button)
