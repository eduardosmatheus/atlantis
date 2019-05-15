import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Layout from '../pages/Layout';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";

function AppRouter() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={Register} />
          <ProtectedRoute path="/" component={Layout} />
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
