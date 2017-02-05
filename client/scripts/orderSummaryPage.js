import OrderSummaryPage from '../../components/orderSummaryPage.jsx';
import Styles from '../scss/orderSummaryPage.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <OrderSummaryPage data={{hello:"world"}} />,
  document.getElementById('root')
);