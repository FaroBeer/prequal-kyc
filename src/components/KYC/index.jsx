/*

  STATE  =  USER RECORD

  registrationDatePreKYC: new Date(),
  registrationDateKYC: new Date(),
  registered:false,                                                                     //end of the process
  approved:false,                                                                       //elegible for KYC  
  waiting: false,                                                                        //for typo2 states  
  prekyc:false,                                                                         //pre kyc done
  step1:false, step2:false, step3:false, step4:false, step5:false, activeStep: 0,       //for the KYC
  email:'',
  firstName:'',
  middleName:'',
  surname:'',
  address:'',
  city:'',
  zipCode:'',
  regionState:'',  
  countryCitizenship:'',
  countryResidence:'',
  dateBirth:'',
  occupation:'',
  amount:'',
  accreditedInvestor: false,

*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';

import './FileUpload.css'
import { Auth, API } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-02.JPG';

import Step1UpdateData from './Step1UpdateData';
import Step2UploadID from './Step2UploadID';
import Error404 from "../Error/404";

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

      cognitoUser: '', cognitoRegion: '', cognitoID: '',
      registrationDatePreKYC: false, registrationDateKYC: false,
      prekyc:false, approved:false, waiting: false, registered:false,                                                                     
      step1:false, step2:false, step3:false, step4:false, step5:false, 
      activeStep: 0,   
      
      email:'',
      firstName:'', middleName:'', surname:'',
      address:'', city:'', zipCode:'', regionState:'',
      occupation:'',
      countryCitizenship:'', countryResidence:'',
      dateBirth:'',
      accreditedInvestor: false,
      amount:'',

      typeOfID: '',
      id1Doc: { name:'', date:'', uploaded: false, approved: false},
      id2Doc: { name:'', date:'', uploaded: false, approved: false},
      picDoc: { name:'', date:'', uploaded: false, approved: false},
      addrDoc: { name:'', date:'', uploaded: false, approved: false},
      accrDoc: { name:'', date:'', uploaded: false, approved: false},

      btnSubmitDisabled : true,
    };
    this.handleChangeStep1 = this.handleChangeStep1.bind(this);
    this._handleSubmitStep1 = this._handleSubmitStep1.bind(this);
  }

  _handleSubmitStep1(e) {
    e.preventDefault(); 
    
    if(this.state.firstName==='' || this.state.surname==='' || 
        this.state.address==='' || this.state.city==='' || this.state.zipCode==='' || this.state.regionState==='' || 
        this.state.countryCitizenship==='' || this.state.countryResidence==='' || 
        this.state.dateBirth==='' || this.state.occupation==='' || 
        this.state.amount==='' || this.state.accreditedInvestor===''){
          alert('Please complete all required fields'); 
          return false;
    
     } else {
      this.setState({ step1: true });  
      this.post();
      console.log('posting');
    }
  }

  handleChangeStep1 = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getStepContent() {
    switch (this.state.activeStep) {
      case 0:
        return <Step1UpdateData 
                              userState={this.state} 
                              classes={this.props.classes} 
                              handleChangeStep1={ this.handleChangeStep1 } 
                              _handleSubmitStep1 ={this._handleSubmitStep1} />
      case 1:
        return <Step2UploadID 
                              userState={this.state} 
                              classes={this.props.classes} />;/*
      case 2:
        return <Step3UploadAddress
                              userStater={this.state} 
                              classes={this.props.classes} />;
      case 3:
        return <Step4UploadAccreditation 
                              userStater={this.state} 
                              classes={this.props.classes} />;*/
      default:
        return <Error404 />;
    }
  }
  handleNextStep = () => {
    switch (this.state.activeStep) {
      case 0:
        console.log('handle next step:\n'+JSON.stringify(this.state));
        this.state.step1 
            ? 
            this.setState (state => ({ activeStep: state.activeStep + 1 }))
            : 
            alert('Step1 not completed');
        this.setState (state => ({
          btnSubmitDisabled: !state.step2,
        }))
        break;
      
     case 1:
      this.state.step2 ? this.setState (state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step2 not completed');
      this.setState (state => ({
        btnSubmitDisabled: !state.step3,
      }))
      break;
    case 2:
      this.state.step3 ? this.setState(state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step3 not completed');
      this.setState (state => ({
        btnSubmitDisabled: !state.step4,
      }))
      break;
    case 3:
      this.state.step4 ? this.setState(state => ({
        activeStep: state.activeStep + 1
      })) : alert('Step4 not completed');
      this.setState (state => ({
        btnSubmitDisabled: !state.step5,
      }))
      break;
    }
  };
  handleBackStep = () => {
    (this.state.activeStep>0) ? this.setState(state => ({
      activeStep: state.activeStep - 1,
    })) : this.setState(state => ({activeStep: 0}))
  };

  
  
post = async () => {
    console.log('calling post for step '+ this.state.activeStep);

    let middleName = this.state.middleName !== '' ? this.state.middleName : null;
    const response = await API.post('preKYCapi', '/items', {
      body: {
        
        registrationDatePreKYC: this.state.registrationDatePreKYC, registrationDateKYC: new Date(),         
        
        // boolean utilities
        prekyc:this.state.prekyc, approved:this.state.approved, waiting: this.state.waiting, registered:this.state.registered,                                                                                                                                                
        step1:this.state.step1, step2:this.state.step2, step3:this.state.step3, step4:this.state.step4, step5:this.state.step5,         
        
        //step 1
        email:this.state.email,
        firstName:this.state.firstName, middleName:middleName, surname:this.state.surname,          
        address:this.state.address, city:this.state.city, zipCode:this.state.zipCode, regionState:this.state.regionState,
        countryCitizenship:this.state.countryCitizenship, countryResidence:this.state.countryResidence,        
        dateBirth:this.state.dateBirth,
        occupation:this.state.occupation,  
        amount:this.state.amount,  
        accreditedInvestor:this.state.accreditedInvestor,         
        
        // upload steps
        typeOfID: this.state.typeOfID,
        id1Doc: { name:this.state.id1Doc.name, date:this.state.id1Doc.date, uploaded: this.state.id1Doc.uploaded, approved: this.state.id1Doc.approved},
        id2Doc: { name:this.state.id2Doc.name, date:this.state.id2Doc.date, uploaded: this.state.id2Doc.uploaded, approved: this.state.id2Doc.approved},
        picDoc: { name:this.state.picDoc.name, date:this.state.picDoc.date, uploaded: this.state.picDoc.uploaded, approved: this.state.picDoc.approved},
        addrDoc: { name:this.state.addrDoc.name, date:this.state.addrDoc.date, uploaded: this.state.addrDoc.uploaded, approved: this.state.addrDoc.approved},
        accrDoc: { name:this.state.accrDoc.name, date:this.state.accrDoc.date, uploaded: this.state.accrDoc.uploaded, approved: this.state.accrDoc.approved},
        
      }
    });
    this.setState({ btnSubmitDisabled: false });  
    console.log('state after submit:\n'+ JSON.stringify(this.state))
}


  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    //if(response) console.log ('user:\n' + JSON.stringify(response));
    this.setState(response);
    //console.log('state:\n'+ JSON.stringify(this.state));

    this.state.approved === false || this.state.waiting ? 
        window.location.href = "/dashboard" : 
        this.state.prekyc===false ? 
            window.location.href = "/" : 
            console.log('approved') 
    
    if((this.state.step1 === true && this.state.activeStep === 0) ||
        (this.state.step2 === true && this.state.activeStep === 1) ||
        (this.state.step3 === true && this.state.activeStep === 2) ||
        (this.state.step4 === true && this.state.activeStep === 3) ||
        (this.state.step5 === true && this.state.activeStep === 4) )
      this.setState({
        btnSubmitDisabled: false
      });

  }
    
  
  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  
    }).then(user => {
          
      const searchingBucketName = 'aws.cognito.identity-id.' + Auth._config.identityPoolId;
      let bucketName;
      
      for (var key in user) {
        if (!user.hasOwnProperty(key)) continue;
    
        var obj = user[key];
        for (var prop in obj) {
            if(!obj.hasOwnProperty(prop)) continue;
            if(prop === searchingBucketName) bucketName = obj[prop];
        }
      } 
      
      if(this.state.email !== user.attributes.email)
        this.setState({
          //cognitoUser: user,         
          bucketName: bucketName, 
          cognitoRegion: Auth._config.region, 
          identityPoolId: Auth._config.identityPoolId,
          email: user.attributes.email,
      });
      this.getUser();
      console.log('componentDidMount:\n'+ JSON.stringify(this.state));
      //console.log('final:\n'+ JSON.stringify(this.state.cognitoUser));
          
          
                    
      })
      .catch(err => console.log(err));
  
    }

  render() {

    const { classes } = this.props;
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
                      disabled={this.state.btnSubmitDisabled}
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