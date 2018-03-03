import React from 'react'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import List from 'material-ui/List'
import withRoot from './withRoot'
import MenuItems from './MenuItems'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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

const Menu = ({ classes }) => (
  <div className={classes.root}>
    <List
      component="nav"
      subheader={<ListSubheader component="div">Меню</ListSubheader>}>
      <MenuItems classes={classes} />
    </List>
  </div>
)

export default withRoot(withStyles(styles)(Menu))
