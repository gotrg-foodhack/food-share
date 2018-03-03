/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import cx from 'classnames'
import { sum, prop, map, values } from 'ramda'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Switch from 'material-ui/Switch'

const styles = {
  chatFooter: {
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approved: props.members[props.currentUser].approve,
    }
  }

  toggleApprove = ({ target: { checked } }) => {
    const { onApprove, onCancelApprove } = this.props
    checked ? onApprove() : onCancelApprove()
    this.setState({ approved: checked })
  }

  render() {
    const { classes, members } = this.props
    const contributed = sum(map(prop('readyToPaySum'), values(members)))

    return (
      <div className={classes.chatFooter}>
        <Typography>Внесено: {contributed} &nbsp;</Typography>
        <Typography>
          Подтвердить:
          <Switch
            color="primary"
            checked={this.state.approved}
            onChange={this.toggleApprove}
          />
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
