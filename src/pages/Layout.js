import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../modules/navigation';
import Header from '../components/Menu/Header';
// routes config
import routes from '../modules/routes';

class Layout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('app.authToken');
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header onSignOut={this.signOut} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb {...this} appRoutes={routes}/>
            <Container fluid>
              <Switch>
                { routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect to="/" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
