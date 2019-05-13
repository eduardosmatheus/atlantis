import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Layout from '../pages/Layout';
import SignIn from '../pages/SignIn';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route path="/" render={props => <Layout {...props} />} />
      </Switch>
    </Router>
  );
}

export default AppRouter;