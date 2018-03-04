/* @flow */

import * as React from 'react'
import { compose, defaultProps } from 'recompose'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

import * as actions from '../../../actions'
import * as store from '../../../front/store/reducers'
import * as selectors from '../../../front/selectors'

export const PayButton = compose(
  withStyles({
    button: {
      color: 'white',
      background: '#3f51b5',
    },
    buttonAwait: {
      paddingLeft: 8,
    },
    spinner: {
      color: 'white',
      width: '20px !important',
      height: '20px !important',
      marginRight: '8px',
    },
  }),
  (connect(
    (state: store.State) => ({
      currentOrderId: selectors.getMyOrderId(state),
      isReadyToPay: selectors.isReadyToPay(state),
      isInPayTransaction: selectors.isInPayTransaction(state),
    }),
    dispatch => ({
      orderPay: compose(dispatch, actions.orderPay),
    }),
    (
      { currentOrderId, isInPayTransaction, isReadyToPay },
      { orderPay },
      { classes },
    ) => ({
      isReadyToPay,
      children: isInPayTransaction ? (
        <React.Fragment>
          <CircularProgress className={classes.spinner} />
          Оплатить
        </React.Fragment>
      ) : (
        'Оплатить'
      ),
      disabled: isInPayTransaction,
      onClick: currentOrderId && (() => orderPay(currentOrderId)),
      classes,
    }),
  ): any),
  defaultProps({
    variant: 'raised',
    type: 'primary',
  }),
)(
  ({ isReadyToPay, classes, isInPayTransaction, ...props }) =>
    isReadyToPay ? (
      <Button
        {...props}
        className={isInPayTransaction ? classes.buttonAwait : classes.button}
      />
    ) : null,
)
