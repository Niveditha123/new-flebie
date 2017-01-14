import PopularLabs from '../../components/popLabs.jsx';
import Styles from '../scss/popularlabs.scss';

import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <PopularLabs data={{hello:"world"}} />,
  document.getElementById('root')
);