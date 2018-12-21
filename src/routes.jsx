// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import Error404 from './components/Error/404';
import Register from './components/Register';
//import Investor from './components/Investor';
import Dashboard from './components/Dashboard';
import { Authenticator } from 'aws-amplify-react';

import { AmplifyTheme } from 'aws-amplify-react';

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
const MySectionBody = Object.assign({}, AmplifyTheme.sectionBody, {background: 'purple'})
//const MyContainer = Object.assign({}, AmplifyTheme.container, {backgroundColor: 'black'})
const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader , sectionBody: MySectionBody, Container: MyContainer});

const AppRoutes = () => (
  <Authenticator theme={MyTheme}>
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route component={Error404} />
    </Switch>
  </App>
  </Authenticator>
);

export default AppRoutes;