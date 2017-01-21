import Confirm from '../../components/confirm.jsx';
import Styles from '../scss/confirm.scss';

import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <Confirm data={{hello:"world"}} />,
  document.getElementById('root')
);