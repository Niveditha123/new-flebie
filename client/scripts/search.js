import Search from '../../components/search.jsx';
import Styles from '../scss/_search.scss';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Search data={{hello:"world"}} />,
  document.getElementById('root')
);