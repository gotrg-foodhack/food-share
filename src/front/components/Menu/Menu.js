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
    background: '#ff7043',
    color: '#ffffff',
    position: 'relative',
    fontSize: '21px',
    padding: '4px 14px',
    marginBottom: '10px',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  listStyle: {
    height: '90%',
  },
  nested: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing.unit * 4,
    '& * + *': {
      marginTop: '10px',
    },
  },
})

const enhance = compose(withRoot, withStyles(styles))

const Menu = ({ classes }) => (
  <div className={classes.root}>
    <List
      className={classes.listStyle}
      component="nav"
      subheader={
        <ListSubheader className={classes.menuTitle} component="div">
          Меню
        </ListSubheader>
      }>
      <MenuItems classes={classes} />
    </List>
  </div>
)

export default enhance(Menu)
