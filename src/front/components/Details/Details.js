/* eslint-disable react/no-array-index-key */
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
    maxWidth: '100%',
    padding: '10px',
    color: '#ffffff',
  },
  content: {
    flex: '1 0 auto',
    width: '245px',
    paddingBottom: '0!important',
  },
  cover: {
    width: 75,
    height: 75,
  },
}

const appBarStyle = {
  background: '#ff7043',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
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
        <Typography
          style={{ fontSize: '21px', padding: '10px 14px' }}
          variant="caption"
          align="left">
          {userId === currentUser ? 'Ваш заказ:' : `${login} заказал(а):`}
        </Typography>
        <Card>
          {products.map((product, index) => {
            const { id, name, photo, price } =
              values(productsData).find(
                ({ id: productId }) => product[productId],
              ) || {}
            const count = values(product)[0]
            return (
              <ProductDetails
                key={userId + name + index}
                classes={classes}
                name={name}
                price={price}
                photo={photo}
                count={count}
                isOwner={userId === currentUser}
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
        <AppBar position="static" color="default" style={appBarStyle}>
          <Toolbar>
            <Typography
              style={{
                color: '#ffffff',
                fontSize: '21px',
                fontWeight: 500,
              }}>
              Поставщик: Dodo pizza
            </Typography>
          </Toolbar>
        </AppBar>
        {this.renderOrderDetails()}
      </div>
    )
  }
}

export default enhance(Details)
