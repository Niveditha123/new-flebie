
import TestList from '../../components/testlist.jsx';
import Styles from '../scss/testlist.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <TestList data={{hello:"world"}} />,
  document.getElementById('root')
);