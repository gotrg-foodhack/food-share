import React from 'react'
import { values, keys } from 'ramda'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import LocalBarIcon from 'material-ui-icons/LocalBar'
import LocalDrinkIcon from 'material-ui-icons/LocalDrink'
import LocalPizzaIcon from 'material-ui-icons/LocalPizza'
import LocalDiningIcon from 'material-ui-icons/LocalDining'
import CakeIcon from 'material-ui-icons/Cake'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import People from 'material-ui-icons/People'
import MediaControlCard from './Card'
import { menu } from '../../mdm'

const mapSectionToIcon = {
  pizza: <LocalPizzaIcon />,
  alcohol: <LocalBarIcon />,
  drinks: <LocalDrinkIcon />,
  desserts: <CakeIcon />,
  snacks: <LocalDiningIcon />,
  combo: <People />,
}

class MenuItems extends React.Component {
  state = {
    pizzaOpen: false,
    snacksOpen: false,
    dessertsOpen: false,
    drinksOpen: false,
    alcoholOpen: false,
  }

  handleClick = productClass => {
    const stateVar = `${productClass}Open`
    this.setState({ [stateVar]: !this.state[stateVar] })
  }

  renderMenuCards = productClass => {
    const itemsByCategory = values(menu[productClass].products)
    return itemsByCategory.map(item => (
      <MediaControlCard key={item.id} item={item} />
    ))
  }
  render() {
    const { classes } = this.props
    return keys(menu).map(section => (
      <div key={section}>
        <ListItem
          button
          primary={menu[section].name}
          onClick={() => this.handleClick(section)}>
          <ListItemIcon>{mapSectionToIcon[section]}</ListItemIcon>
          <ListItemText inset primary={menu[section].name} />
          {this.state[`${section}Open`] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state[`${section}Open`]}
          timeout="auto"
          unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              {this.renderMenuCards(section)}
            </ListItem>
          </List>
        </Collapse>
      </div>
    ))
  }
}

export default MenuItems
