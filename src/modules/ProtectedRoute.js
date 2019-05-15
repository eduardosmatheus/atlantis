import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
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

function RouteRenderer({ component: Component, ...rest }) {
  const { location } = rest;
  const isAuthenticated = useAuthStatus();
  if (!['/signin', 'signup'].includes(location.pathname) && !isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: location }
        }}
      />
    );
  }
  return <Component {...rest} />;
}

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        props =>
          <RouteRenderer component={Component} {...props} />
      }
    />);
}