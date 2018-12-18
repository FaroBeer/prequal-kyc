import React from 'react';
import { element } from 'prop-types';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';


Amplify.configure(aws_exports);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered:false,
      approved:false,
      step1:false,
      step2:false,
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
    //this.handleChange = this.handleChange.bind(this)
    //this._handleSubmit = this._handleSubmit.bind(this) 
    //this.post = this.post.bind(this) 
  }

  

  /*handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
    this.post(this.children);
    console.log('posting');
  }

  post = async () => {
    console.log('calling api');

    if(this.state.firstName==='' || this.state.surname==='' || 
        this.state.address==='' || this.state.city==='' || this.state.zipCode==='' || this.state.regionState==='' || 
        this.state.countryCitizenship==='' || this.state.countryResidence==='' || 
        this.state.dateBirth==='' || this.state.occupation===''){
          alert('Please complete all required fields'); 
          return false;
  
    } else {

      let middleName = this.state.middleName !== '' ? this.state.middleName : null;
      let amount = this.state.amount !== '' ? this.state.amount : null;

      const response = await API.post('preKYCapi', '/items', {
        body: {
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
          amount:amount,
          occupation:this.state.occupation,         
        }
      });
      //alert(JSON.stringify(response, null, 2));
      
      if(country==='United States') window.location.href='/dashboard-us';
      else  window.location.href='/dashboard';
  }*/
  
    getUser = async () => {
      const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
      console.log (JSON.stringify(response));

      //check if registered
      if(response.firstName!=='' && response.surname!=='') { //enough to say step1 done
        this.setState({    // we don't need to set all the state!!      
          step1:true,
          firstName:response.firstName,
          middleName:response.middleName,
          surname:response.surname,
          countryCitizenship:response.countryCitizenship,
          countryResidence:response.countryResidence,
          


        });
      }

      if(response.amount!=='' && response.accreditedInvestor!=='') { //enough to say step2 done
        this.setState({    // we don't need to set all the state!!      
          step2:true,
          accreditedInvestor:response.accreditedInvestor,
          amount:response.amount,
        });
      }

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
        console.log ('email: ' + this.state.email);
        this.getUser().bind(this);
      })
      .catch(err => console.log(err));
    }

    return (
      <div className="App">
        <Header userState={this.state} />

        

        <Footer  userState={this.state} />
      </div>
    );
  }

}

export default withAuthenticator (App, true);
