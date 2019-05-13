import React from 'react';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/marines', exact: true, name: 'Marinas', component: About },
  { path: '/marines/new', name: 'New', component: About },
  { path: '/marines/list', name: 'List', component: About },
  { path: '/sailors', name: 'Marinheiros', component: About },
  { path: '/boats', name: 'Embarcações', component: About },
  { path: '/schedules', name: 'Agenda', component: About },
  { path: '/users', name: 'Users', component: Users },
];

export default routes;
