import Dashboard from '../../components/dashboard.jsx';
import Styles from '../scss/dashboard.scss';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <Dashboard data={{hello:"world"}} />,
  document.getElementById('root')
);