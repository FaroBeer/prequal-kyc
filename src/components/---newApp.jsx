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
  /*constructor(props) {
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
  }*/

  render() {
    return (
      <div className="App">
        <Header userState={this.state} />

        <Content  userState={this.state} children={} />

        <Footer  userState={this.state} />
      </div>
    );
  }

}

export default withAuthenticator (App, true);
