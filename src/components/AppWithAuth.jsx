import React, { Component } from "react";
import aws_exports from '../aws-exports';
import App from "./App";
import { Authenticator, Greetings } from "aws-amplify-react";

import { AmplifyTheme } from 'aws-amplify-react';
import Background from './shared/images/bg_kyc/14122018-01.JPG';


console.log(AmplifyTheme);

const MyFormSection = Object.assign({}, AmplifyTheme.formSection, {marginTop: 50, marginBottom: 50,})
const MySectionContainer = Object.assign({}, AmplifyTheme.sectionContainer, {padding: 0})
const MyFormContainer = Object.assign({}, AmplifyTheme.formContainer, {
          background: `url(${Background})`,
          minHeight: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth,
          margin: 0,
})
const MyTheme = Object.assign( {}, AmplifyTheme, { 
          formSection: MyFormSection,
          sectionContainer: MySectionContainer,
          formContainer: MyFormContainer
});

class AppWithAuth extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Authenticator hide={[Greetings]} amplifyConfig={config} theme={MyTheme}>
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
