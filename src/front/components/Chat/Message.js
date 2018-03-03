import React from 'react'
import Typography from 'material-ui/Typography'

const messageStyles = {
  display: 'inline-flex',
  maxWidth: '250px',
  padding: '4px',
  backgroundColor: '#e6e6e6',
  borderRadius: '3px',
  marginTop: '2px',
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
      <Typography variant="caption" align="center">
        {userId} добавляет {productId} к заказу
      </Typography>
    )
  }

  if (eventType === 'set pay sum') {
    return (
      <Typography variant="caption" align="center">
        {userId} готов(а) заплатить {paySum} руб.
      </Typography>
    )
  }
  const owner = userId === currentUser
  const withoutCaption = index > 0 && chat[index - 1].userId === userId

  return (
    <div style={{ margin: '0 6px', alignSelf: owner && 'flex-end' }}>
      {!withoutCaption && (
        <div>
          <Typography variant="caption" align="left">
            {userId}
          </Typography>
        </div>
      )}
      <div style={messageStyles}>{text}</div>
    </div>
  )
}

export default Message
