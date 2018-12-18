import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo-Look-Lateral.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  AppHeader: {
    height: 150,
    backgroundColor: '#282c34',
    opacity: 0.9,
    padding: 50,
  }, 
  register: {
    color: '#fff',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
  },
  logo: {
    width: 530,
    height: 150,
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

/*function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Look Lateral KYC
          </Typography>
          <Link
          to="/register">
          <Button>Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}*/

function NavBar(props) {
  const { classes } = props;
  console.log(props);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppHeader}>
        <Toolbar>
          
          <div className={classes.logo} />
          <Link
          to="/register">
          <Button className={classes.register}>Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);