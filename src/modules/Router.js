import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from '../pages/Layout';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import axios from '../axios-common';

function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticate] = useState(!!localStorage.getItem('app.authToken'));
  useEffect(() => {
    const getAuthentication = async () => {
      try {
        await axios.get('/secure/user');   
      } catch (err) {
        setIsAuthenticate(false)
      }
    }
    getAuthentication();
  }, [isAuthenticated])
  return isAuthenticated;
}

function AppRouter() {
  const isAuthenticated = useAuthStatus();
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={Register} />
        <Route
          path="/"
          render={
            props => isAuthenticated
              ? <Layout {...props} />
              : <Redirect to="/signin" />
          }
        />
      </Switch>
    </Router>
  );
}

export default AppRouter;
