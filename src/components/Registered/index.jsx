
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Auth, API } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-03.JPG';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150,
  },
  card: {
    marginTop: 175,
    marginBottom: 40,
    minWidth: 275,
    //minHeight: 650,
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
  },
  tableHome: {
    width: '100%',
    height: '100%',
    marginBottom: 50,
  },
  tdImage: {
    width: '50%',
    padding: 5,
  },
  tdText: {
    width: '50%',
    padding: 10,
    textAlign: 'center',
    verticalAlign: 'center',
  },
  imageThanks: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 25,
    color: 'rgb(0,0,256,0.9)',
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    color: 'rgb(0,0,256,0.54)',
  },
 
});

class Registered extends Component {

  state = {
      
      identityPoolId: '', cognitoRegion: '', bucketName: '',

      registrationDatePreKYC: false, registrationDateKYC: false, registrationUpdateKYC: false,

      prekyc:false, approved:false, waiting: false, registered:false,                                                                     
      step1:false, step2:false, step3:false, step4:false, step5:false, completedKyc:false,
      activeStep: 0,   
      
      email:'',
      firstName:'', middleName:'', surname:'',
      address:'', city:'', zipCode:'', regionState:'',
      occupation:'',
      countryCitizenship:'', countryResidence:'',
      dateBirth:'',
      accreditedInvestor: false,
      amount:'',

      typeOfID: 'passport',
      id1Doc: { name:'', date:'', uploaded: false, approved: false},
      id2Doc: { name:'', date:'', uploaded: false, approved: false},
      picDoc: { name:'', date:'', uploaded: false, approved: false},
      addrDoc: { name:'', date:'', uploaded: false, approved: false},
      accrDoc: { name:'', date:'', uploaded: false, approved: false},

    url: '',
    label: '',
    classKYCbutton: this.props.classHide,

    open: false,
    buttonIsHovered: false,
  };

  handleLoad = () => {
    this.getUser().then( () => {
      this.post()      
    })
  }

  
  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    if(response){
      this.setState(response);   
      if(response.ste1===false || response.ste2===false || response.ste3===false || response.ste4===false || response.ste5===false)
        window.location.href = '/complete';
      else {
        console.log('registered - before post:\n'+ JSON.stringify(this.state));
        this.post();

      }
      
      console.log('state getUser:\n'+ JSON.stringify(this.state));

    /*if(response.completedKyc === false ){
      if(response.prekyc === false ) window.location.href= '/';
      else window.location.href= '/complete';
    } */
    }
  } 

  post = async () => {    // general - for all steps!!!

    const response = await API.post('preKYCapi', '/items', {
      body: {
        
        registrationDatePreKYC: this.state.registrationDatePreKYC, registrationDateKYC: new Date(), registrationUpdateKYC: new Date(),         
        
        // boolean utilities
        prekyc:this.state.prekyc, approved:this.state.approved, waiting: this.state.waiting, registered:this.state.registered,                                                                                                                                                
        step1:this.state.step1, step2:this.state.step2, step3:this.state.step3, step4:this.state.step4, step5:this.state.step5, completedKyc:this.state.completedKyc,        
        
        //step 1 - prekyc
        email:this.state.email,
        firstName:this.state.firstName, middleName:this.state.middleName !== '' ? this.state.middleName : null, surname:this.state.surname,          
        address:this.state.address, city:this.state.city, zipCode:this.state.zipCode, regionState:this.state.regionState,
        countryCitizenship:this.state.countryCitizenship, countryResidence:this.state.countryResidence,        
        dateBirth:this.state.dateBirth,
        occupation:this.state.occupation,  
        amount:this.state.amount,  
        accreditedInvestor:this.state.accreditedInvestor,         
        
        // upload steps
        typeOfID: this.state.typeOfID,
        id1Doc: { 
          name:this.state.id1Doc.name ? this.state.id1Doc.name : null, 
          date:this.state.id1Doc.date ? this.state.id1Doc.date : null,  
          uploaded: this.state.id1Doc.uploaded, 
          approved: this.state.id1Doc.approved
        },
        id2Doc: { 
          name:this.state.id2Doc.name ? this.state.id2Doc.name : null, 
          date:this.state.id2Doc.date ? this.state.id2Doc.date : null, 
          uploaded: this.state.id2Doc.uploaded, 
          approved: this.state.id2Doc.approved
        },
        picDoc: { 
          name:this.state.picDoc.name ? this.state.picDoc.name : null, 
          date:this.state.picDoc.date ? this.state.picDoc.date : null, 
          uploaded: this.state.picDoc.uploaded, 
          approved: this.state.picDoc.approved
        },
        addrDoc: { 
          name:this.state.addrDoc.name ? this.state.addrDoc.name : null, 
          date:this.state.addrDoc.date ? this.state.addrDoc.date : null, 
          uploaded: this.state.addrDoc.uploaded, 
          approved: this.state.addrDoc.approved
        },
        accrDoc: { 
          name:this.state.accrDoc.name ? this.state.accrDoc.name : null, 
          date:this.state.accrDoc.date ? this.state.accrDoc.date : null,
          uploaded: this.state.accrDoc.uploaded, 
          approved: this.state.accrDoc.approved
        }
        
      }
    });
    //setTimeout(this.getUser(), 1000);
    console.log('post response:\n'+ JSON.stringify(response));
    console.log('state after submit:\n'+ JSON.stringify(this.state));
    //return response;
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
      
      //if(this.state.email !== user.attributes.email)
        this.setState({
          bucketName: bucketName, 
          cognitoRegion: Auth._config.region, 
          identityPoolId: Auth._config.identityPoolId,
          email: user.attributes.email,
          completedKyc: true
      });
      
      //this.getUser();
      //console.log('componentDidMount:\n'+ JSON.stringify(this.state));   
      this.handleLoad();         
    })
    .catch(err => console.log(err));
  
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
          
          
          <table className={classes.tableHome}>
            <tr>
              <td className={classes.tdImage}>
                <CardMedia
                  className={classes.imageThanks}
                  component='img' 
                  image={require("../../shared/images/18122018-thanks_page02.JPG")} 
                  title="Look Lateral KYC"
                />
              </td>
              <td className={classes.tdText}>
                <Typography className={classes.title} gutterBottom>
                THIS IS THE END..... OF YOUR REGISTRATION! 
                </Typography>
                
                <Typography className={classes.text} gutterBottom>
                Thanks, your are submitted to our KYC
                </Typography>

              </td>
            </tr>
          </table>

        </CardContent>
      </Card>
      </Grid>
      <Grid item xs></Grid>
      </Grid>
      </div>
    );

    
  }
}

export default withStyles(styles)(Registered);
