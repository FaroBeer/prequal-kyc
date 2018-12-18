import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
//import axios from 'axios';
//import './FileUpload.css'
import { API } from 'aws-amplify';
//import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-03.JPG';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150,
  },
  input: {
    display: 'none',
  },
  card: {
    marginTop: 175,
    marginBottom: 40,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  
  dense: {
    marginTop: 19
  }
});

class Dashboard extends Component {
  
  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log (JSON.stringify(response));

    this.state.email = response.email;
    this.state.firstName = response.firstName;
    this.state.middleName = response.middleName;
    this.state.surname = response.surname;
    this.state.amount = response.amount;
    this.state.occupation = response.occupation;
    this.state.phone = response.phone;
    this.state.country = response.country;
  } 

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="h5" component="h2">
          Thank you for your application.
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          We will review your information as soon as possible and we will let you know if you are qualified to proceed to the second step of the KYC.
          </Typography>
        </CardContent>
      </Card>
      </Grid>
      <Grid item xs></Grid>
      </Grid>
      </div>
    );

    
  }
}

export default withStyles(styles)(Dashboard);
