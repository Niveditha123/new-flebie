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
            
            <div className="dashboard-main">
                <div></div>
                <div style={{ color: "grey" , textAlign: "center" }} className="alert alert-danger" id="connectionAlert" ></div>
                <div className="container-fluid" style={{backgroundColor: "rgba(255,255,255,0.60)"}} >
                <div className="jumbotron">
                    <h1>Hello, world Test Bootstrap!</h1>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    <p><a classNamd="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
                    </div>
                </div>

            </div>
            
        );
    }
}
export default Dashboard;