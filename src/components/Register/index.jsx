import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Filter1 from '@material-ui/icons/Filter1'
import axios from 'axios';
import './FileUpload.css'
import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';




const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'none',
  },
  card: {
    marginTop: 25,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  dense: {
    marginTop: 19
  }
});

class TextFields extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    this.post();
    console.log('posting');
  }


  state = {
    email:'',
    firstName:'',
    middleName:'',
    surname:''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  post = async () => {
    console.log('calling api');

    let firstName = this.state.firstName !== '' ? this.state.firstName : null;
    let middleName = this.state.middleName !== '' ? this.state.middleName : null;
    let surname = this.state.surname !== '' ? this.state.surname : null;

    if(firstName==='' || surname===''){
      if(firstName==='' && surname!=='') alert('The given name is required');
      if(firstName!=='' && surname==='') alert('The surname is required');
      if(firstName==='' && surname==='') alert('The given name and the surname are required');
      return false;
    } else {
      const response = await API.post('preKYCapi', '/items', {
        body: {
          email:this.state.email,
          firstName:firstName,
          middleName:middleName,
          surname:surname
        }
      });
      alert(JSON.stringify(response, null, 2));
    }
  }

  get = async () => {
    console.log('calling api');
    const response = await API.get('preKYCapi', '/items/object/1');
    alert(JSON.stringify(response, null, 2));
  }
  list = async () => {
    console.log('calling api');
    const response = await API.get('preKYCapi', '/items/1');
    alert(JSON.stringify(response, null, 2));
  }
  user = async () => {
    console.log('calling api');
    const response = Auth.currentAuthenticatedUser();
    alert(JSON.stringify(response, null, 2));
  }

  render() {

    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => {
    this.state.email=user.attributes.email;
  })
  .catch(err => console.log(err));

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent>
                <Filter1 /><h2>Personal Details</h2>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    placeholder="First Name"
                    id="first-name"
                    label="Given Name"
                    className={classes.textField}
                    value={this.state.firstName}
                    onChange={this.handleChange("firstName")}
                    margin="normal"
                  />
                  <TextField
                    placeholder="Middle Name"
                    id="middle-name"
                    label="Middle Name"
                    className={classes.textField}
                    value={this.state.middleName}
                    onChange={this.handleChange("middleName")}
                    margin="normal"
                  />
                  <TextField
                    placeholder="Last Name"
                    id="last-name"
                    label="Surname"
                    className={classes.textField}
                    value={this.state.lastName}
                    onChange={this.handleChange("surname")}
                    margin="normal"
                  />

                </form>
                <Button className="submitButton" 
                  variant="contained"
                  component="span"
                  onClick={(e)=>this._handleSubmit(e)}>
                  SUBMIT
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);