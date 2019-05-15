import React from 'react';
import MarinesForm from '../pages/Marines/New';
import Marines from '../pages/Marines';
import Sailors from '../pages/Sailors';
import Boats from '../pages/Boats';
import Schedules from '../pages/Schedules';
import SchedulesForm from '../pages/Schedules/New';
import BoatsForm from '../pages/Boats/New';
import SailorsForm from '../pages/Sailors/New';

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
  { path: '/sailors/new', name: 'Marinheiros', component: SailorsForm },
  { path: '/sailors/list', name: 'List', component: Sailors },
  { path: '/boats', exact: true, name: 'Embarcações', component: Boats },
  { path: '/boats/new', name: 'New', component: BoatsForm },
  { path: '/boats/list', name: 'Embarcações', component: Boats },
  { path: '/schedules', exact: true, name: 'Agenda', component: Schedules },
  { path: '/schedules/list', name: 'Agenda', component: Schedules },
  { path: '/schedules/new', name: 'New', component: SchedulesForm },
  { path: '/users', name: 'Users', component: Users },
];

export default routes;
