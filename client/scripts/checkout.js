import Checkout from '../../components/checkout.jsx';
import Styles from '../scss/_checkout.scss';
import reqwest from 'reqwest';
import React from 'react';
import ReactDOM from 'react-dom';

    function loadUser(){
        reqwest({
            url: '/getCurrentUser'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , error: function (err) { 
                Fleb.hideLoader();
            }
            , success: function (resp) {
              Fleb.data.userPtype = (resp.role === "LABADMIN")?3:2;
                  ReactDOM.render(
                <Checkout data={Fleb.data} />,
                document.getElementById('root')
              ); 
            }   
            });
    }
document.addEventListener("DOMContentLoaded", function(event) { 
    var data = JSON.parse(document.getElementById("dataDump").getAttribute("value"));
    Fleb.data = data;
    loadUser();
  });
