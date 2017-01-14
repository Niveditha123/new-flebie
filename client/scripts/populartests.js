import PopularTests from '../../components/popularTests.jsx';
import Styles from '../scss/populartests.scss';

import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <PopularTests data={{hello:"world"}} />,
  document.getElementById('root')
);