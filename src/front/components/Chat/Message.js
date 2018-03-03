import React from 'react'
import Typography from 'material-ui/Typography'

const messageStyles = {
  display: 'inline-flex',
  maxWidth: '250px',
  padding: '10px 15px',
  backgroundColor: '#e6e6e6',
  borderRadius: '7px',
  marginTop: '2px',
  textAlign: 'left',
}

const CustomCaption = {
  fontSize: '18px',
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
}) => {
  if (eventType === 'add to cart') {
    return (
      <Typography variant="caption" align="center" style={CustomCaption}>
        <b>{userId}</b> добавляет <b>{productId}</b> к заказу
      </Typography>
    )
  }

  if (eventType === 'set pay sum') {
    return (
      <Typography variant="caption" align="center" style={CustomCaption}>
        <b>{userId}</b> готов(а) заплатить <b>{paySum}</b> руб.
      </Typography>
    )
  }
  const owner = userId === currentUser
  const withoutCaption = index > 0 && chat[index - 1].userId === userId

  return (
    <div style={{ margin: '0 6px', alignSelf: owner && 'flex-end' }}>
      {!withoutCaption && (
        <div>
          <Typography variant="caption" align="left" style={CustomCaption}>
            {userId}
          </Typography>
        </div>
      )}
      <div style={messageStyles}>{text}</div>
    </div>
  )
}

export default Message
