
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

  
  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log (JSON.stringify(response));

    if(response.completedKyc === false ){
      if(response.prekyc === false ) window.location.href= '/';
      else window.location.href= '/complete';
    } 
  } 

  

  render() {

    const { classes } = this.props;
    
    Auth.currentAuthenticatedUser({
      bypassCache: false  
    }).then(user => {
      
      if(this.state.email !== user.attributes.email)
        this.setState({
          email: user.attributes.email
        });
      this.getUser();
    })
    .catch(err => console.log(err));

    

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
