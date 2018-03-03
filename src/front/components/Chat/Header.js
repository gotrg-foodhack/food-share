import React, { Component } from 'react'
import cx from 'classnames'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CheckCircle from 'material-ui-icons/CheckCircle'
import ExitToApp from 'material-ui-icons/ExitToApp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import Button from 'material-ui/Button'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton';

const styles = {
  barStyles: {
    minHeight: 'none',
    width: '100%',
    zIndex: 1300,
  },
  CustomToolbar: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 0',
  },
  titleCustom: {
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'normal',
    flexGrow: 0,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  membersList: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    fontSize: '21px',
    width: '100%',
    zIndex: 1200,
    paddingTop: '40px',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  memberRow: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
  },
  payBtn: {
    borderRadius: '5px',
    margin: '0 15px',
  },
  outButton: {
    width: '45px',
    height: '45px',
  },
}

class Header extends Component {
  state = {
    showMembers: false,
  }

  toggleCollapse = () =>
    this.setState(prevState => ({ showMembers: !prevState.showMembers }))

  renderMembers = () => {
    const { classes, members } = this.props
    return Object.keys(members).map(member => {
      const { approve, readyToPaySum } = members[member]
      return (
        <div key={member} className={classes.memberRow}>
          <div>{member}</div>
          <div style={{ display: 'flex' }} className={classes.center}>
            {approve && <CheckCircle />}
            <span style={{ marginLeft: '8px' }}>{`${readyToPaySum} руб.`}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    const { classes, members, onCancelOrder, onOrderPay } = this.props
    const { showMembers } = this.state
    const disabledBtn = !Object.values(members).every(({ approve }) => approve)

    return (
      <div className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <div className={classes.barStyles}>
          <AppBar position="static" color="default">
            <Toolbar>
              <div className={classes.CustomToolbar}>
              <Typography className={classes.titleCustom} variant="headline" color="inherit">
                    Ваш заказ
              </Typography>
              <div className={cx(classes.flexRow, classes.spaceBetween)}>
                <div className={classes.spaceBetween}>
                  <div className={cx(classes.flexRow, classes.center)}>
                    <IconButton>
                    <ExitToApp className={classes.outButton} onClick={onCancelOrder} />
                    </IconButton>
                  </div>
                </div>
                <Button
                  className={classes.payBtn}
                  variant="raised"
                  color="primary"
                  size="large"
                  disabled={disabledBtn}
                  onClick={onOrderPay}>
                  ОПЛАТИТЬ
                </Button>
                <div className={cx(classes.flexColumn, classes.center)}>
                  <KeyboardArrowDown className={classes.outButton} onClick={this.toggleCollapse} />
                </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          </div>
        </div>
        <Collapse in={showMembers} timeout="auto" unmountOnExit>
          <div className={classes.membersList}>{this.renderMembers()}</div>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
