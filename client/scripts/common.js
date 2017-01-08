
import Modal from '../../components/utils/modal.jsx';
require ("./layout.js");

import React from 'react';
import ReactDOM from 'react-dom';
import  OpenCartModalContent from '../../components/modules/editCart.jsx';


class CallModalContent extends React.Component{
  render(){
    return(<div className="clearfix">
      <div className="modal-body text-muted">
            <h4>9611136000</h4>
            <h4>support@flebie.com</h4>
            <p>Our customer experience team is available on all days from 9am to 11:30pm to assist you with any questions or issues you might have.Please, feel free to email us at support@flebie.com
            </p>
       </div>
       <div className="modal-footer">
          <button type="submit" data-dismiss="modal"  className="btn btn-success curved">
          THANK you</button>
        </div>
       </div>
    )
  }
}

ReactDOM.render(
  <div>
  <Modal open={false} selfClose={true}  
    id={"callUsPop"} 
    css="callus-popup"
    headText={"Customer Support"}
  content={<CallModalContent/>} />
  <Modal open={false} selfClose={true}  
    id={"cartPopUp"} 
    headText={"Your Tests"}
    css="your-tests-pop"
  content={<OpenCartModalContent/>} />
  </div>,
  document.getElementById('utilBlock')
);