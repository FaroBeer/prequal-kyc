// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import Error404 from './components/Error/404';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;