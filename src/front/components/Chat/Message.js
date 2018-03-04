import React from 'react'
import { values } from 'ramda'
import styled from 'styled-jss'
import MUIAvatar from 'material-ui/Avatar'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Typography from 'material-ui/Typography'
import maxim from '../Map/avatars/maxim.jpg'
import oleg from '../Map/avatars/oleg.jpg'
import pavlik from '../Map/avatars/pavlik.jpg'
import perlmutter from '../Map/avatars/perlmutter.jpg'
import { products } from '../../mdm'

const avatars = { maxim, oleg, pavlik, perlmutter }

const AccountCircleIcon = styled(AccountCircle)({
  width: '50%',
  height: '50%',
})

const Avatar = styled(MUIAvatar)({
  width: 48 * 0.5,
  height: 48 * 0.5,
  marginBottom: '5px',
})

const loginRowStyles = {
  display: 'flex',
  alignItems: 'flex-end',
  '& * + *': {
    marginLeft: '4px',
  },
}

const messageStyles = {
  display: 'inline-flex',
  maxWidth: '250px',
  minWidth: '100px',
  padding: '10px 15px',
  backgroundColor: '#e6e6e6',
  borderRadius: '7px',
  marginTop: '4px',
  textAlign: 'left',
}

const CustomCaption = {
  fontSize: '18px',
  padding: '5px 10px',
}

const Message = ({
  index,
  chat,
  eventType,
  userId,
  paySum,
  productId,
  text,
  currentUser,
  login,
}) => {
  const { name } =
    (productId && values(products).find(({ id }) => id === productId)) || {}
  switch (eventType) {
    case 'add to cart':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> добавляет <b>{name}</b> к заказу
        </Typography>
      )
    case 'remove from cart':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> убирает <b>{name}</b> из заказа
        </Typography>
      )
    case 'order pay':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> оформляет заказ за <b>{paySum}</b> руб.
        </Typography>
      )
    case 'set pay sum':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> готов(а) заплатить <b>{paySum}</b> руб.
        </Typography>
      )
    case 'cancel order':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> отказывается от заказа и покидает чат
        </Typography>
      )
    case 'join to order':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> присоединяется к заказу
        </Typography>
      )

    default: {
      const owner = userId === currentUser
      const withoutCaption =
        index > 0 &&
        chat[index - 1].userId === userId &&
        chat[index - 1].eventType === eventType
      const src = avatars[login]

      return (
        <div style={{ margin: '0 6px', alignSelf: owner && 'flex-end' }}>
          {!withoutCaption && (
            <div style={loginRowStyles}>
              {src ? (
                <Avatar src={src} alt={login} />
              ) : (
                <Avatar alt={login}>
                  <AccountCircleIcon />
                </Avatar>
              )}
              <Typography variant="caption" align="left" style={CustomCaption}>
                {login}
              </Typography>
            </div>
          )}
          <div style={messageStyles}>{text}</div>
        </div>
      )
    }
  }
}

export default Message
