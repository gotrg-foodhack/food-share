import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import Typography from 'material-ui/Typography';
import styled from 'styled-jss'

const styles = theme => ({
  card: {
    display: 'flex',
    padding: '0 10px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  cartImg: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle'
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
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.cartImg} >
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
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
