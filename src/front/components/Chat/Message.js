import React from 'react'
import { values } from 'ramda'
import Typography from 'material-ui/Typography'
import { products } from '../../mdm'

const messageStyles = {
  display: 'inline-flex',
  maxWidth: '250px',
  minWidth: '100px',
  padding: '10px 15px',
  backgroundColor: '#e6e6e6',
  borderRadius: '7px',
  marginTop: '2px',
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
  const productName =
    productId && values(products).find(({ id }) => id === productId).name
  switch (eventType) {
    case 'add to cart':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> добавляет <b>{productName}</b> к заказу
        </Typography>
      )
    case 'remove from cart':
      return (
        <Typography variant="caption" align="center" style={CustomCaption}>
          <b>{login}</b> убирает <b>{productName}</b> из заказа
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
      const withoutCaption = index > 0 && chat[index - 1].userId === userId

      return (
        <div style={{ margin: '0 6px', alignSelf: owner && 'flex-end' }}>
          {!withoutCaption && (
            <div>
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
