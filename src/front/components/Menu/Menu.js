import React from 'react'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import List from 'material-ui/List'
import withRoot from './withRoot'
import MenuItems from './MenuItems'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  textItem: {
    fontSize: '24px !important',
  },
  menuTitle: {
    width: '100%',
    // backgroundColor: '#002984',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#ffffff',
    position: 'relative',
    fontSize: '21px',
  },
  nested: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing.unit * 4,
    '& * + *': {
      marginTop: '6px',
    },
  },
})


const enhance = compose(withRoot, withStyles(styles))

const Menu = ({ classes }) => (
  <div className={classes.root}>
    <List
      component="nav"
      subheader={<ListSubheader className={classes.menuTitle} component="div">Меню</ListSubheader>}>
      <MenuItems classes={classes}/>
    </List>
  </div>
)

export default enhance(Menu)
