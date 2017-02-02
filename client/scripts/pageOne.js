import PageOne from '../../components/pageOne.jsx';
import Styles from '../scss/pageOne.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <PageOne data={{hello:"world"}} />,
  document.getElementById('root')
);