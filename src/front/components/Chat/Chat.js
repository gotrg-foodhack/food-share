import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Header from './Header'
import * as actions from '../../../actions'

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
}

const userId = 'Вася'

const mapStateToProps = ({ orders }) => ({
  members: orders.find(({ owner }) => owner === userId).members,
})

const enhance = compose(withStyles(styles), connect(mapStateToProps, actions))

class Chat extends Component {
  state = {}

  componentDidMount() {}

  render() {
    const { classes, members } = this.props

    return (
      <div className={classes.flexColumn}>
        <Header members={members} />
      </div>
    )
  }
}

export default enhance(Chat)
