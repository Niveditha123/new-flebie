
import LabList from '../../components/listlabsfortest.jsx';
import Styles from '../scss/testlist.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <LabList data={{hello:"world"}} />,
  document.getElementById('root')
);