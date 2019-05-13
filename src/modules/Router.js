import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Layout from '../pages/Layout';
import Register from '../pages/Register';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Register} />
        <Route exact path="/signin" component={Register} />
        <Route path="/" render={props => <Layout {...props} />} />
      </Switch>
    </Router>
  );
}

export default AppRouter;