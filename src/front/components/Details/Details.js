import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { keys, values } from 'ramda'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography/Typography'
import Card from 'material-ui/Card'
import ProductDetails from './ProductDetails'
import { products as productsData } from '../../mdm'
import * as actions from '../../../actions'
import { getMyOrderCartItems, getMyOrderId, getUserId } from '../../selectors'

const styles = {
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    padding: '8px 4px',
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: '0!important',
  },
  cover: {
    width: 75,
    height: 75,
  },
}

const mapStateToProps = state => ({
  orderId: getMyOrderId(state) || null,
  cartItems: getMyOrderCartItems(state) || {},
  currentUser: getUserId(state) || null,
})

const enhance = compose(withStyles(styles), connect(mapStateToProps, actions))

class Details extends Component {
  onRemoveFromCart = productId => {
    const { removeFromCart, orderId } = this.props
    removeFromCart({ productId, orderId })
  }

  renderOrderDetails = () => {
    const { cartItems, classes, currentUser } = this.props
    const sortedCartItems = []
    keys(cartItems).forEach(userId => {
      if (userId === currentUser) {
        sortedCartItems.unshift({ ...cartItems[userId], userId })
      } else {
        sortedCartItems.push({ ...cartItems[userId], userId })
      }
    })

    return sortedCartItems.map(({ userId, login, products }) => (
      <div key={userId} style={{ marginTop: '12px' }}>
        <Typography variant="caption" align="left">
          {userId === currentUser ? 'Ваш заказ:' : `${login} заказал:`}
        </Typography>
        <Card>
          {products.map(product => {
            const { id, name, photo, price } = values(productsData).find(
              ({ id: productId }) => product[productId],
            )
            const count = values(product)[0]
            return (
              <ProductDetails
                key={userId + name}
                classes={classes}
                name={name}
                price={price}
                photo={photo}
                count={count}
                onRemove={() => this.onRemoveFromCart(id)}
              />
            )
          })}
        </Card>
      </div>
    ))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.details}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title">Поставщик: Dodo pizza</Typography>
          </Toolbar>
        </AppBar>
        {this.renderOrderDetails()}
      </div>
    )
  }
}

export default enhance(Details)
