import React from 'react';
import { element } from 'prop-types';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';

Amplify.configure(aws_exports);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      firstName:'',
      middleName:'',
      surname:'',
      address:'',
      city:'',
      zipCode:'',
      region:'',
      amount:'',
      occupation:'',
      country:'',
      countryResidence:'',
      dateBirth:'',
    }
    this.handleChange = this.handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this) 
    this.post = this.post.bind(this) 

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  _handleSubmit(e) {
    e.preventDefault();

    // need to check all fields! noone should be empty, only middle_name

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
      
      /*if(country==='United States') window.location.href='/dashboard-us';
      else */ window.location.href='/dashboard';
  }

  render() {
    console.log('');
    return (
      <div className="App">
        <Header userState={this.state} />

        <Content  userState={this.state} _handleSubmit={this._handleSubmit} post={this.post} handleChange={this.handleChange}>
          {children} 
        </Content>

        <Footer  userState={this.state} />
      </div>
    );
  }

}

export default withAuthenticator (App, true);
