import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
/*import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {  FormControlLabel } from "@material-ui/core";
import FormLabel from '@material-ui/core/FormLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
*/
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';

//import Filter1 from '@material-ui/icons/Filter1';
import './FileUpload.css'
import { Auth, API } from 'aws-amplify';
//import { FormControl, InputLabel } from "@material-ui/core";
import Background from '../../shared/images/bg_kyc/14122018-02.JPG';

import Step1UpdateData from './Step1UpdateData';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop:-150,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
  },
  Select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
  },
  selectOp: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
    marginTop: theme.spacing.unit*2,
    marginBottom: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  group:{
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
  },
  investorDialog: {
    color: '#333',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  investorDialogHover: {
    color: '#f00',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  radioboxLabel: {
    marginTop: theme.spacing.unit*5,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'calc(100% - 32px)',
  },
  stepper: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
});

function getSteps() {
  return ['Insert your data', 'Upload ID', 'Upload address', 'Payment'];
}

class TextFields extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered:false,
      approved:false,
      prekyc:false,
      step1:false,   step2:false,   step3:false,
      email:'',
      firstName:'',
      middleName:'',
      surname:'',
      address:'',
      city:'',
      zipCode:'',
      regionState:'',
      occupation:'',
      countryCitizenship:'',
      countryResidence:'',
      dateBirth:'',
      accreditedInvestor: false,
      amount:'',
      open: false,
      buttonIsHovered: false,
      activeStep: 0,  
    };
    this.handleChange = this.handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.post();
    console.log('posting');
  }

/*  state = {
    registered:false,
    approved:false,
    prekyc:false,
    step1:false,   step2:false,   step3:false,
    email:'',
    firstName:'',
    middleName:'',
    surname:'',
    address:'',
    city:'',
    zipCode:'',
    regionState:'',
    occupation:'',
    countryCitizenship:'',
    countryResidence:'',
    dateBirth:'',
    accreditedInvestor: false,
    amount:'',
    open: false,
    buttonIsHovered: false,
    activeStep: 0,
  }; */

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setButtonHovered = (value) => {
    this.setState({ buttonIsHovered: value});
  };

  getStepContent() {
    switch (this.state.activeStep) {
      case 0:
        return <Step1UpdateData userState={this.state} classes={this.props.classes} handleChangeFields={ this.handleChange } _handleSubmit ={this._handleSubmit} />
      case 1:
        return 'Upload your ID';
      case 2:
        return 'Upload your address';
      case 3:
        return 'payment page';
      default:
        return 'Unknown step';
    }
  }
  handleNextStep = () => {
    switch (this.state.activeStep) {
      case 0:
      this.state.step1 ? this.setState (state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step1 not completed')
      break;
      case 1:
      this.state.step2 ? this.setState (state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step2 not completed')
      break;
      case 2:
      this.state.step3 ? this.setState(state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step3 not completed')
      break;
    }
  };
  handleBackStep = () => {
    (this.state.activeStep>0) ? this.setState(state => ({
      activeStep: state.activeStep - 1,
    })) : this.setState(state => ({activeStep: 0}))
  };

  
  
post = async () => {
    console.log('calling api');

    if(this.state.firstName==='' || this.state.surname==='' || 
        this.state.address==='' || this.state.city==='' || this.state.zipCode==='' || this.state.regionState==='' || 
        this.state.countryCitizenship==='' || this.state.countryResidence==='' || 
        this.state.dateBirth==='' || this.state.occupation==='' || 
        this.state.amount==='' || this.state.accreditedInvestor===''){
          alert('Please complete all required fields'); 
          return false;
  
    } else {

      let middleName = this.state.middleName !== '' ? this.state.middleName : null;
      const response = await API.post('preKYCapi', '/items', {
        body: {
          registrationDate: new Date(),
          step1:true,
          email:this.state.email,
          firstName:this.state.firstName,
          middleName:middleName,
          surname:this.state.surname,          
          address:this.state.address,
          city:this.state.city,
          zipCode:this.state.zipCode,
          regionState:this.state.regionState,
          countryCitizenship:this.state.countryCitizenship,
          countryResidence:this.state.countryResidence,
          dateBirth:this.state.dateBirth,
          occupation:this.state.occupation,  
          amount:this.state.amount,  
          accreditedInvestor:this.state.accreditedInvestor,       
        }
      });
      this.state.step1=true;

  }
}

  /*get = async () => {
    console.log('calling api');
    const response = await API.get('preKYCapi', '/items/object/1');
    alert(JSON.stringify(response, null, 2));
    return response;
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
  }*/
  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    if(response) console.log ('user:\n' + JSON.stringify(response));
      this.setState(response);
    console.log('state:\n'+ JSON.stringify(this.state));
    //if(response.step1 === true && response.step2 === true) window.location.href='/';
    //else 
    //  if(response.step1 === true) window.location.href='/';
    

    }
    
  

  render() {

    const { classes } = this.props;
    if (this.state.step1 === false) {
    Auth.currentAuthenticatedUser({
        bypassCache: false  
    }).then(user => {
      
      if(this.state.email !== user.attributes.email)
        this.setState({
          email: user.attributes.email
        });
    })
    .catch(err => console.log(err));
    
    this.getUser();}

    const steps = getSteps();
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine,
        }}
      />

    );

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={6}>
          <Card className={classes.card}>
              <CardContent>
  
          <div className={classes.stepper}>
            <Stepper activeStep={this.state.activeStep} connector={connector}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                </div>
              ) : (
                <div>
                  <div className={classes.instructions}>{this.getStepContent()}</div>
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBackStep}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={this.state.step1 === 0 || this.state.prekyc === 0}
                      onClick={this.handleNextStep}
                      className={classes.button}
                    >
                      {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

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