import React from 'react';
import reqwest from 'reqwest';

class Dashboard extends React.Component {
    constructor(props){
		super(props);
        this.state={
            test:[]
        }
    }
    
    componentDidMount(){
        //this.loadPopLabs.bind(this)();
        
	}

    render(){
      
        return (
            
            <div id="root" className="dashboard-main">
                <div></div>
                <div style={{ color: "grey" , textAlign: "center" }} className="alert alert-danger" id="connectionAlert" ></div>
                <div className="container-fluid" style={{backgroundColor: "rgba(255,255,255,0.60)"}} ></div>
            </div>
            
        );
    }
}
export default Dashboard;