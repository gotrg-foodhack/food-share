/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import cx from 'classnames'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Message from './Message'

const styles = {
  chatBody: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  chatMessages: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
  },
  input: {
    outline: 'none',
    border: '1px solid #ccc',
    resize: 'none',
    width: '75%',
  },
  inputBtn: {
    borderRadius: 0,
    width: '25%',
  },
  marginBetween: {
    '& * + *': {
      marginTop: '4px',
    },
  },
}

class Body extends Component {
  state = {
    messageInput: '',
  }

  onInputChange = ({ target: { value } }) =>
    this.setState({ messageInput: value })

  onSendMessage = () => {
    this.props.onSendMessage(this.state.messageInput)
    this.setState({ messageInput: '' })
  }

  renderMessages = () => {
    const { chat, currentUser } = this.props
    return chat.map((message, idx) => (
      <Message
        key={`${message.userId}-${idx}`}
        index={idx}
        chat={chat}
        currentUser={currentUser}
        {...message}
      />
    ))
  }

  render() {
    const { classes } = this.props
    const { messageInput } = this.state

    return (
      <div className={classes.chatBody}>
        <div className={cx(classes.chatMessages, classes.marginBetween)}>
          {this.renderMessages()}
        </div>
        <div className={classes.flexRow} style={{ marginTop: '4px' }}>
          <textarea
            className={classes.input}
            value={messageInput}
            onChange={this.onInputChange}
          />
          <Button
            className={classes.inputBtn}
            variant="raised"
            color="primary"
            onClick={this.onSendMessage}>
            Отправить
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Body)
