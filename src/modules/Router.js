import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Layout from '../pages/Layout';

function Index() {
  return <h2>Signin</h2>;
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Signin" component={Index} />
        <Route path="/" render={props => <Layout {...props} />} />
      </Switch>
    </Router>
  );
}

export default AppRouter;