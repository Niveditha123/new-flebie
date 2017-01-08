
import Index from '../../components/index.jsx';
import PopularTests from '../../components/popularTests.jsx';
import PopularLabs from '../../components/PopularLabs.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
//import createBrowserHistory from 'history/lib/createBrowserHistory';

//import ReactRouter from 'react-router';

import Styles from '../scss/index.scss';

////import { Router, Route, Link,IndexRoute  } from 'react-router';
//var browserHistory = ReactRouter.browserHistory;



//const App = React.createClass(PopularTests)

ReactDOM.render(
  <Index data={{hello:"world"}} />,
  document.getElementById('root')
);
/*ReactDOM.render(
  <Router history={createBrowserHistory()} >
   <Route path="/" component={Index} />
   <Route path="/popularTests" component={PopularTests} />
   <Route path="/popularlabs" component={PopularLabs} />
   <Route path="/multisearchlabs/:multisearchparam" component={Search} />
  </Router>
, document.getElementById('root'));*/




