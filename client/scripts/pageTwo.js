import PageTwo from '../../components/pageTwo.jsx';
import Styles from '../scss/pageTwo.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <PageTwo data={{hello:"world"}} />,
  document.getElementById('root')
);