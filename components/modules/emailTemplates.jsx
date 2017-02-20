import React from 'react';
import ReactDOM  from 'react-dom/server';
class CustomerEmail extends React.Component {
	constructor(props){
		super(props);
        console.log(props);	
		this.state = {
			loading:true
		}
	}
	render(){

		return (<div>
            email temoplate
		 </div> );
	}
}

module.exports = {
    CustomerEmail:CustomerEmail
}

/*

			*/