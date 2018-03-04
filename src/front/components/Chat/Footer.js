/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import cx from 'classnames'
import { sum, prop, map, values, keys } from 'ramda'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import { PayButton } from '../PayButton'
import { products } from '../../mdm'

const styles = {
  chatFooter: {
    display: 'flex',
    flexDirection: 'column',
  },
  firstRow: {
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    '& * + *': {
      marginLeft: '8px',
    },
  },
  customSubtext: {
    outline: 'none',
    fontSize: '21px',
    paddingTop: '10px',
  },
  dashed: {
    borderBottom: '1px dashed #1658ac',
  },
}

const cartItems = {
  '777': {
    login: 'Витя',
    products: [{ dodo: 2 }, { maffinVanilla: 2 }],
  },
  '888': {
    login: 'Надо',
    products: [{ margarita: 1 }, { sprite: 1 }],
  },
  '999': {
    login: 'Выйти',
    products: [{ cocaCola: 4 }],
  },
}

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputMoney: '',
      modal: false,
      approved: props.members[props.currentUser].approve,
    }
  }

  onInputChange = ({ target: { value: inputMoney } }) =>
    this.setState({ inputMoney })

  onSetPaySum = () => {
    const { onSetPaySum } = this.props
    onSetPaySum(this.state.inputMoney)
    this.toggleModal()
  }

  toggleApprove = ({ target: { checked } }) => {
    const { onApprove, onCancelApprove } = this.props
    checked ? onApprove() : onCancelApprove()
    this.setState({ approved: checked })
  }

  toggleModal = () => this.setState(prev => ({ modal: !prev.modal }))

  render() {
    const { classes, members, currentUser } = this.props
    const { readyToPaySum } = members[currentUser]
    const { approved, modal, inputMoney } = this.state
    const contributed = sum(map(prop('readyToPaySum'), values(members)))
    let total = 0
    values(cartItems).map(({ products: p }) =>
      p.forEach(product => {
        const productName = keys(product)[0]
        const productCount = values(product)[0]
        const { price } = values(products).find(({ id }) => id === productName)
        total += productCount * price
      }),
    )
    const need = total - contributed

    return (
      <div className={classes.chatFooter}>
        <div className={classes.firstRow}>
          <div
            role="button"
            tabIndex="0"
            className={cx(classes.customSubtext, classes.dashed)}
            onClick={this.toggleModal}
            onKeyPress={this.toggleModal}>
            Внесено: {readyToPaySum} &nbsp;
          </div>
          <div className={classes.customSubtext}>
            {' '}
            Подтвердить:
            <Switch
              color="primary"
              checked={approved}
              onChange={this.toggleApprove}
            />{' '}
          </div>
        </div>
        <Tooltip
          id="tooltip-icon"
          title="Внесено / Сумма заказа (Осталось внести)">
          <div className={classes.secondRow} aria-label="money">
            <Typography style={{ fontSize: '21px' }}>
              {contributed} / {total} ({need})
            </Typography>
            <PayButton />
          </div>
        </Tooltip>
        <Dialog
          open={modal}
          onClose={this.toggleModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Оплачиваемая Вами сумма:
          </DialogTitle>
          <DialogContent>
            <TextField
              id="inputMoney"
              label="Введите сумму"
              value={inputMoney}
              onChange={this.onInputChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleModal} color="secondary">
              Отмена
            </Button>
            <Button
              onClick={this.onSetPaySum}
              color="primary"
              autoFocus
              disabled={!Number.isInteger(+inputMoney)}>
              Ок
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
