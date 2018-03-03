import React from 'react';
import { values } from 'ramda'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import LocalBarIcon from 'material-ui-icons/LocalBar';
import LocalDrinkIcon from 'material-ui-icons/LocalDrink';
import LocalPizzaIcon from 'material-ui-icons/LocalPizza';
import LocalDiningIcon from 'material-ui-icons/LocalDining';
import CakeIcon from 'material-ui-icons/Cake';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import withRoot from './withRoot';
import styled from 'styled-jss'
import MediaControlCard from './Card'
import { menu, products } from '../../mdm'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const combo = {}
const pizza = {}
const snacks = {}
const desserts = {}
const drinks = {}
const alcohol = {}


const productsItems = Object.values(products)
console.log(Object.values(products))

class ItemsCards extends React.Component {
    render(){
      console.log(productsItems)
      // ==> на входе:  массив с объектами-элементами меню
      // ==> на выходе: должен быть список отдельных продуктов нужной категории -> продукты передаются в карточки
      //ItemsCards - в пропсах передаются productClass = {'pizza' || 'snacks' || 'desserts' || 'drinks' || 'alcohol'}
      // if (productsItems.length !== 0) {
      //     return (
      //         <ul>
      //             {productsItems.map((item) => {
      //                 return (
      //                     <Card
      //                     item={item}
      //                     />);})
      //                 }
      //         </ul>);
       return (<MediaControlCard />)}}

class MenuItems extends React.Component {
  state = {
    pizzaOpen: false,
    snacksOpen: false,
    dessertsOpen: false,
    drinksOpen: false,
    alcoholOpen: false,
  };

  handleClick = (productClass) => {
    console.log(productClass)
    switch(productClass){
      case 'pizza':
        this.setState({ pizzaOpen: !this.state.pizzaOpen })
        break
      case 'snacks':
        this.setState({ snacksOpen: !this.state.snacksOpen })
        break
      case 'desserts':
        this.setState({ dessertsOpen: !this.state.dessertsOpen })
        break
      case 'drinks':
        this.setState({ drinksOpen: !this.state.drinksOpen })
        break
      case 'alcohol':
        this.setState({ alcoholOpen: !this.state.alcoholOpen })
        break
    }}

  render() {
    const { classes } = this.props;
      return (
      <div>
        <div>
        <ListItem button primary={menu.pizza.name} onClick={() => this.handleClick('pizza')}>
          <ListItemIcon>
          <LocalPizzaIcon />
          </ListItemIcon>
          <ListItemText inset primary={menu.pizza.name} />
          {this.state.pizzaOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.pizzaOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ItemsCards productClass='pizza' productsItems={productsItems}/>
          </ListItem>
          </List>
        </Collapse>
        </div>
        <div>
        <ListItem button onClick={() => this.handleClick('snacks')}>
          <ListItemIcon>
          <LocalDiningIcon />
          </ListItemIcon>
          <ListItemText inset primary={menu.snacks.name} />
          {this.state.snacksOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.snacksOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ItemsCards productClass='snacks' />
          </ListItem>
          </List>
        </Collapse>
        </div>
        <div>
        <ListItem button onClick={() => this.handleClick('desserts')} >
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText inset primary={menu.desserts.name} />
          {this.state.dessertsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.dessertsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ItemsCards productClass='desserts'  productsItems={productsItems}/>
          </ListItem>
          </List>
        </Collapse>
        </div>
        <div>
        <ListItem button onClick={() => this.handleClick('drinks')}>
          <ListItemIcon>
            <LocalDrinkIcon />
          </ListItemIcon>
          <ListItemText inset primary={menu.drinks.name} />
          {this.state.drinksOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.drinksOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ItemsCards productClass='drinks' productsItems={productsItems}/>
          </ListItem>
          </List>
        </Collapse>
        </div>
        <div>
        <ListItem button onClick={() => this.handleClick('alcohol')}>
          <ListItemIcon>
            <LocalBarIcon />
          </ListItemIcon>
          <ListItemText inset primary={menu.alcohol.name} />
          {this.state.alcoholOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.alcoholOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ItemsCards productClass='alcohol' productsItems={productsItems}/>
          </ListItem>
          </List>
        </Collapse>
        </div>
      </div>
)}}

MenuItems.propTypes = {
  classes: PropTypes.object.isRequired,
};


class Menu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
    <div className={classes.root}>
    <List
      component="nav"
      subheader={<ListSubheader component="div">Меню</ListSubheader>}>
    <MenuItems classes={classes}/>
    </List>
    </div>
    )
    }}


export default withRoot(withStyles(styles)(Menu));
