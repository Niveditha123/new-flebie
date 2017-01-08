import Checkout from '../../components/checkout.jsx';
import Styles from '../scss/_checkout.scss';

import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <Checkout data={{hello:"world"}} />,
  document.getElementById('root')
);