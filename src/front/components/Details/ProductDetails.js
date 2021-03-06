import React from 'react'
import { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography/Typography'
import IconButton from 'material-ui/IconButton'
import RemoveShoppingCart from 'material-ui-icons/RemoveShoppingCart'

const ProductDetails = ({
  classes,
  photo,
  name,
  price,
  count,
  isOwner,
  onRemove,
}) => (
  <div className={classes.flexRow}>
    <CardMedia className={classes.cover} image={photo} title={name} />
    <CardContent className={classes.content}>
      <Typography variant="headline">{name}</Typography>
      <Typography variant="subheading" color="textSecondary">
        {price} руб. х {count} шт. = {price * count} руб.
      </Typography>
    </CardContent>
    <IconButton onClick={onRemove}>
      <RemoveShoppingCart
        style={{
          display: isOwner ? 'block' : 'none',
          alignSelf: 'center',
          marginRight: '4px',
          color: 'black',
        }}
      />
    </IconButton>
  </div>
)

export default ProductDetails
