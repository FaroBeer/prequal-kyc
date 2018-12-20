import React from 'react';
//import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
//import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-01.JPG';
//import LogoLL from '../../shared/images/Archivio/kyc_logo_01.png';
//import LogoLL from '../../shared/images/logo_01.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150
  },
  card: {
    marginTop: 210,
    marginBottom: 40,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  imageLL: {
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 34,
    marginBottom: 30,
    color: 'rgb(0,0,0,0.54)',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: 'rgb(0,0,0,0.54)',   
  },
  pos: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    color: 'rgb(0,0,0,0.54)',
  },
  registerButton: {
    textDecoration: 'none',
  }, 
  register: {
    color: '#fff',
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
  },
});

function Home(props) {
  
  const { classes } = props;
  let url = '/register'; let label = 'Register';
    
    
    
  if(this.state.step1 === false) {
    url = '/register'; label = 'Register';
    //} else if(props.userState.step1 === true && props.userState.step2 === false) {
    //  url = '/investor'; label = 'Register'; 
  } else {
    url = '/dashboard'; label = 'Dashboard';
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={24}>
    <Grid item xs></Grid>
    <Grid item xs={6}>
    <Card className={classes.card}>
    
    <CardMedia
    className={classes.imageLL}
    component='img' 
    image={require("../../shared/images/logo_01.png")} 
    title="Look Lateral KYC"
    />
    
    <CardContent>
    
    <Typography className={classes.subtitle}>
    WELCOME TO THE LOOK LATERAL SECURITY TOKEN OFFERING
    </Typography>
    
    <Typography className={classes.title} gutterBottom>
    KYC FIRST STEP<br />PRE-QUALIFICATION PROCEDURE
    </Typography>
    
    <Typography className={classes.pos}>
    This procedure is necessary to verify that you are qualified to purchase the Look security token, issued under Reg D and Reg S exemptions.<br /><br />
    Once you receive our approval you will have access to the full private placement memorandum, the complete white paper and the STO terms and conditions.
    </Typography>
    
    <Link className={classes.registerButton}
          to={url}>
      <Button className={classes.register}>{label}</Button>
    </Link>
    
    </CardContent>
    </Card>
    </Grid>
    <Grid item xs></Grid>
    </Grid>
    </div>
    );
  }
  
  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Home);
  