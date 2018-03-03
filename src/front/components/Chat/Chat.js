import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Header from './Header'
import Body from './Body'
import * as actions from '../../../actions'
import Footer from './Footer'

const styles = {
  chat: {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
  },
}

const currentUser = '111'

const mapStateToProps = ({ orders }) => {
  const currentOrder = orders.find(
    ({ owner, members }) => owner === currentUser || members[currentUser],
  )
  return {
    orderId: !currentOrder ? null : currentOrder.id,
    members: !currentOrder ? {} : currentOrder.members,
    chat: !currentOrder ? [] : currentOrder.chat,
  }
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, actions))

class Chat extends Component {
  onOrderPay = () => {
    const { orderPay, orderId } = this.props
    orderPay(orderId)
  }

  onCancelOrder = () => {
    const { cancelOrder, orderId } = this.props
    cancelOrder(orderId)
  }

  onChatMessage = message => {
    const { chatMessage, orderId } = this.props
    chatMessage({ orderId, message })
  }

  onOrderApprove = () => {
    const { orderApprove, orderId } = this.props
    orderApprove(orderId)
  }

  onCancelOrderApprove = () => {
    const { cancelOrderApprove, orderId } = this.props
    cancelOrderApprove(orderId)
  }

  render() {
    const { classes, members, chat } = this.props

    return (
      <div className={classes.chat}>
        <Header
          members={members}
          onCancelOrder={this.onCancelOrder}
          onOrderPay={this.onOrderPay}
        />
        <Body
          chat={chat}
          currentUser={currentUser}
          onSendMessage={this.onChatMessage}
        />
        <Footer
          members={members}
          currentUser={currentUser}
          onApprove={this.onOrderApprove}
          onCancelApprove={this.onCancelOrderApprove}
        />
      </div>
    )
  }
}

export default enhance(Chat)
