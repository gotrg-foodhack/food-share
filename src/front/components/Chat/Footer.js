/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import cx from 'classnames'
import { sum, prop, map, values } from 'ramda'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'

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
    justifyContent: 'center',
  },
  customSubtext: {
    fontSize: '21px',
    paddingTop: '10px',
  },
  dashed: {
    borderBottom: '1px dashed #1658ac',
  },
}

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      approved: props.members[props.currentUser].approve,
    }
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
    const contributed = sum(map(prop('readyToPaySum'), values(members)))

    return (
      <div className={classes.chatFooter}>
        <div className={classes.firstRow}>
          <Typography className={classes.underlined}>
            <div
              role="button"
              tabIndex="0"
              className={cx(classes.customSubtext, classes.dashed)}
              onClick={this.toggleModal}
              onKeyPress={this.toggleModal}>
              Внесено: {readyToPaySum} &nbsp;
            </div>
          </Typography>
          <Typography>
            <div className={classes.customSubtext}>
              {' '}
              Подтвердить:
              <Switch
                color="primary"
                checked={this.state.approved}
                onChange={this.toggleApprove}
              />{' '}
            </div>
          </Typography>
        </div>
        <div className={classes.secondRow}>
          <Typography>{contributed} / million</Typography>
        </div>
        <Dialog
          open={this.state.modal}
          onClose={this.toggleModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Введите сумму</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleModal} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
