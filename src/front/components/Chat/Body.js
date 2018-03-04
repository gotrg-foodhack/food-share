/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import cx from 'classnames'
import { withStyles } from 'material-ui/styles'
import Send from 'material-ui-icons/Send'
import IconButton from 'material-ui/IconButton'
import Message from './Message'

const styles = {
  chatBody: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '70%',
    paddingBottom: '40px',
  },
  chatMessages: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
    fontSize: '21px',
    padding: '40px 0 20px 0',
  },
  chatArea: {
    overflow: 'auto',
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
    height: '40px',
    width: '85%',
    fontSize: '21px',
  },
  inputBtn: {
    borderRadius: 0,
    height: '55px',
    width: '15%',
    paddingBottom: '10px',
  },
  marginBetween: {
    '& * + *': {
      marginTop: '8px',
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
        <div className={classes.chatArea}>
          <div className={cx(classes.chatMessages, classes.marginBetween)}>
            {this.renderMessages()}
          </div>
        </div>
        <div
          className={classes.flexRow}
          style={{
            marginTop: '0px',
            position: 'fixed',
            background: '#ffffff',
            bottom: '23%',
            paddingLeft: '3px',
            width: '100%',
          }}>
          <textarea
            className={classes.input}
            value={messageInput}
            onChange={this.onInputChange}
          />
          <IconButton
            className={classes.inputBtn}
            variant="raised"
            color="primary"
            onClick={this.onSendMessage}>
            <Send />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Body)
