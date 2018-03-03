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
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'

const styles = {
  flexRow: {
    display: 'flex',
    flexGrow: 1,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  membersList: {
    width: '100%',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  memberRow: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 8px',
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
    const { classes, members } = this.props
    const { showMembers } = this.state
    const disabledBtn = !Object.values(members).every(({ approve }) => approve)

    return (
      <div className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <AppBar position="static" color="default">
            <Toolbar>
              <div className={cx(classes.flexRow, classes.spaceBetween)}>
                <div>
                  <Typography variant="title" color="inherit">
                    Новый заказ
                  </Typography>
                  <div className={classes.flexRow}>
                    <ExitToApp />
                    <Typography variant="subheading" color="inherit">
                      &nbsp;Выйти
                    </Typography>
                  </div>
                </div>
                <Button variant="raised" color="primary" disabled={disabledBtn}>
                  ОПЛАТИТЬ ЗАКАЗ
                </Button>
                <div className={cx(classes.flexColumn, classes.center)}>
                  <KeyboardArrowDown onClick={this.toggleCollapse} />
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Collapse in={showMembers} timeout="auto" unmountOnExit>
          <div className={classes.membersList}>{this.renderMembers()}</div>
        </Collapse>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
