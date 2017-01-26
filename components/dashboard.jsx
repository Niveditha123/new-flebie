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
            <div className="dashboard-main ">
                <h1>Dashboard</h1>
                
            </div>
        );
    }
}
export default Dashboard;