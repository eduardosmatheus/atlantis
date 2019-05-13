import React from 'react';
import MarinesForm from '../pages/Marines/New';
import Marines from '../pages/Marines';
import Sailors from '../pages/Sailors';
import Boats from '../pages/Boats';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/marines', exact: true, name: 'Marinas', component: Marines },
  { path: '/marines/new', name: 'New', component: MarinesForm },
  { path: '/marines/list', name: 'List', component: Marines },
  { path: '/sailors', exact: true, name: 'Marinheiros', component: Sailors },
  { path: '/sailors/list', name: 'List', component: Sailors },
  { path: '/boats', exact: true, name: 'Embarcações', component: Boats },
  { path: '/boats/list', name: 'Embarcações', component: Boats },
  { path: '/schedules', name: 'Agenda', component: About },
  { path: '/users', name: 'Users', component: Users },
];

export default routes;
