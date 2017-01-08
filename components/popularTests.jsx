import React from 'react';
import reqwest from 'reqwest';

class PopularTests extends React.Component {
    constructor(props){
		super(props);
    }
    componenDidMount(){
        console.log("popular");
	}
    render(){
        return (
            <div>
                <h1>Popular tests</h1>
            </div>
        );
    }
}
export default PopularTests;