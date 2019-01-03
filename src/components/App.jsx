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


import React from 'react';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
import Amplify, { Auth, API } from 'aws-amplify';

Amplify.configure(aws_exports);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationDatePreKYC: false,
      registrationDateKYC: false,
      registered:false,                                                                    
      approved:false,                                                             
      waiting: false,                                                             
      prekyc:false,                                                               
      step1:false, step2:false, step3:false, step4:false, step5:false, activeStep: 0,  
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
    }
  }

  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);

    //check if registered
    if(response.firstName && response.surname && this.state.firstName !== response.firstName && this.state.surname !== response.surname) { //enough to say step1 done
      this.setState({    // we don't need to set all the state!!      
        approved:response.approved || false,
        waiting:response.waiting || false,
        prekyc:response.prekyc || false,
        step1:false, step2:false, step3:false, step4:false, step5:false, activeStep: 0,   //for the KYC
        firstName:response.firstName,
        middleName:response.middleName,
        surname:response.surname,
        countryCitizenship:response.countryCitizenship,
        countryResidence:response.countryResidence,
        accreditedInvestor:response.accreditedInvestor,
        amount:response.amount,
      });
    }

    /*if(response.amount && response.amount !== this.state.amount) { //enough to say step2 done
      this.setState({    // we don't need to set all the state!!      
        step2:true,
        accreditedInvestor:response.accreditedInvestor,
        amount:response.amount,
      });
    }*/
  }
  

  render() {
    
    if( this.state.email === ''){
      
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
   
    } else {
      this.getUser();
    }

    if (this.props.authState === "signedIn") {
      return (
        
        <div className="App">
          <Header userState={this.state} />

          <Content children={this.props.children} />
            
          <Footer  userState={this.state} />
        </div>
      );
    } else {
      return null;
    }
  }

}

//export default withAuthenticator (App);
export default App;
