
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

class LoginModalContent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showlogin:false
    }
  }
  componentDidMount(){
    if(location.hash=="#login"){
      this.setState({
        showlogin:true
      })
    }
  }
  render(){
    var content= <div className="clearfix">
      <div className="modal-body text-muted">
            <h4>Login to Flebie</h4>
       </div>
       <div className="modal-footer">
          <button type="submit" data-dismiss="modal"  className="btn btn-success curved">
          Login</button>
        </div>
       </div>;
    return(
      <Modal open={this.state.showlogin} selfClose={true}  
    id={"loginPop"} 
    css="login-popup"
    headText={"login"}
  content={content} />
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
  <LoginModalContent/>
  </div>,
  document.getElementById('utilBlock')
);
ReactDOM.render(  <OpenCartModalContent triggerElem={true} header={false}/>,
  document.getElementById('cartPl'))