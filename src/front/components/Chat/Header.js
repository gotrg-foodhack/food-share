import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import CheckCircle from 'material-ui-icons/CheckCircle'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import Collapse from 'material-ui/transitions/Collapse'

import { OrderCancelButton } from '../OrderCancelButton'

const styles = {
  barStyles: {
    minHeight: 'none',
    width: '100%',
    zIndex: 1300,
  },
  CustomToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleCustom: {
    textAlign: 'center',
  },
  subTitleCustom: {
    textAlign: 'center',
    fontSize: '14px',
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
  membersList: {
    backgroundColor: '#f5f5f5',
    fontSize: '18px',
    height: '120px',
    padding: '30px',
    overflow: 'auto',
  },
  memberRow: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
  },
  outButton: {
    width: '30px',
    height: '30px',
    margin: '0 8px',
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
      const { approve, login, readyToPaySum } = members[member]
      return (
        <div key={member} className={classes.memberRow}>
          <div>{login}</div>
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
    const peopleCount = Object.keys(members).length
    return (
      <div className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <div className={classes.barStyles}>
            <AppBar
              style={{ background: '#ff7043' }}
              position="static"
              color="primary">
              <Toolbar disableGutters>
                <div className={classes.CustomToolbar}>
                  <OrderCancelButton />
                  <div>
                    <Typography
                      className={classes.titleCustom}
                      variant="headline"
                      color="inherit">
                      Ваш заказ
                    </Typography>
                    <Typography
                      className={classes.subTitleCustom}
                      variant="subheading"
                      color="inherit">
                      человек в чате: {peopleCount}
                    </Typography>
                  </div>
                  <KeyboardArrowDown
                    className={classes.outButton}
                    onClick={this.toggleCollapse}
                  />
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
