import React from 'react'
import { withStateHandlers, compose } from 'recompose'
import { connect } from 'react-redux'

import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import CheckIcon from 'material-ui-icons/Check'

import * as selectors from '../../selectors'

const enhance = compose(
  connect(state => ({
    isAllPaid: selectors.isAllPaid(state),
  })),
  withStateHandlers(
    { wasClosed: false },
    { close: () => () => ({ wasClosed: true }) },
  ),
)

const SuccessDialog = ({ wasClosed, isAllPaid, close }) => (
  <Dialog
    open={!wasClosed && isAllPaid}
    onClose={close}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    {/* <DialogTitle id="alert-dialog-title">Оплачиваемая Вами сумма:</DialogTitle> */}
    <DialogContent
      style={{
        alignItems: 'center',
        display: 'flex',
        fontSize: 18,
      }}>
      <CheckIcon
        style={{ paddingRight: 4, width: 30, height: 30, color: 'green' }}
      />
      Оплата прошла успешно
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary" autoFocus>
        Ок
      </Button>
    </DialogActions>
  </Dialog>
)

export default enhance(SuccessDialog)
