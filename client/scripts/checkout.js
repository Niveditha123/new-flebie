import Checkout from '../../components/checkout.jsx';
import Styles from '../scss/_checkout.scss';

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", function(event) { 
    var data = JSON.parse(document.getElementById("dataDump").getAttribute("value"));
    console.log(data);
    ReactDOM.render(
  <Checkout data={data} />,
  document.getElementById('root')
); 
  });
