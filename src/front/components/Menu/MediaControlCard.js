import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart'
import Typography from 'material-ui/Typography'
import * as actions from '../../../actions'

const styles = () => ({
  card: {
    position: 'relative',
    display: 'flex',
    padding: '0 10px',
    width: '300px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '150px',
  },
  cartImg: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  cover: {
    margin: '5px',
    width: 70,
    height: 70,
  },
  button: {
    poaition: 'absolute',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  addIcon: {
    width: '50px',
  },
  priceSpan: {
    color: '#ff7043',
    fontWeight: 600,
  }
})

const currentUser = '111'

const mapStateToProps = ({ orders }) => {
  const currentOrder = orders.find(
    ({ owner, members }) => owner === currentUser || members[currentUser],
  )
  return {
    orderId: !currentOrder ? null : currentOrder.id,
  }
}

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
              <Typography variant="title"> {item.name} </Typography>
              <Typography className={classes.priceSpan} variant="subheading" color="textSecondary">
                {item.price}&nbsp;₽
              </Typography>
            </CardContent>
          </div>
          <div className={classes.button}>
            <IconButton>
              <AddShoppingCartIcon className={classes.addIcon}/>
            </IconButton>
          </div>
        </Card>
      </div>
    )
  }
}

export default enhance(MediaControlCard)
