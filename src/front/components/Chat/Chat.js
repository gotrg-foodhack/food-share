import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Header from './Header'
import Body from './Body'
import * as actions from '../../../actions'
import Footer from './Footer'
import {
  getMyOrderId,
  getMyOrderChat,
  getMyOrderMembers,
  getUserId,
  getMyOrderCartItems,
} from '../../selectors'

const styles = {
  chat: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}

const mapStateToProps = state => ({
  orderId: getMyOrderId(state) || null,
  members: getMyOrderMembers(state) || {},
  chat: getMyOrderChat(state) || [],
  currentUser: getUserId(state) || null,
  cartItems: getMyOrderCartItems(state) || {},
})

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

  onSetPaySum = paySum => {
    const { setPaySum, orderId } = this.props
    setPaySum({ orderId, paySum })
  }

  render() {
    const { classes, members, chat, currentUser, cartItems } = this.props

    return (
      <div className={classes.chat}>
        <Header members={members} onCancelOrder={this.onCancelOrder} />
        <Body
          chat={chat}
          currentUser={currentUser}
          onSendMessage={this.onChatMessage}
        />
        <Footer
          members={members}
          currentUser={currentUser}
          cartItems={cartItems}
          onApprove={this.onOrderApprove}
          onCancelApprove={this.onCancelOrderApprove}
          onSetPaySum={this.onSetPaySum}
        />
      </div>
    )
  }
}

export default enhance(Chat)
