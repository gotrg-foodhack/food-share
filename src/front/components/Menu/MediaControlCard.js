import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart'
import Typography from 'material-ui/Typography'
import * as actions from '../../../actions'
import { getMyOrderId } from '../../selectors'

const styles = () => ({
  card: {
    display: 'flex',
    padding: '0 10px',
    width: '300px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  cartImg: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  cover: {
    margin: '10px',
    width: 70,
    height: 70,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  },
})

const mapStateToProps = state => ({
  orderId: getMyOrderId(state) || null,
})

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, actions),
)

class MediaControlCard extends Component {
  onAddToCart = productId => {
    const { addToCart, orderId } = this.props
    addToCart({ productId, orderId })
  }

  render() {
    const { classes, item } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.cartImg}>
            <CardMedia
              className={classes.cover}
              image={item.photo} // изображение
              title={item.name}
            />
          </div>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline"> {item.name} </Typography>
              <Typography variant="subheading" color="textSecondary">
                {item.price}
              </Typography>
            </CardContent>
          </div>
          <div className={classes.button}>
            <IconButton>
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </Card>
      </div>
    )
  }
}

export default enhance(MediaControlCard)
