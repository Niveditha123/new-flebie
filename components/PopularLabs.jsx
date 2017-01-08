import React from 'react';
import reqwest from 'reqwest';

class PopularLabs extends React.Component {
    constructor(props){
		super(props);
    }
    componentDidMount(){
        console.log("popular");
	}
    render(){
        return (
            <div>
                <h1>Popular Labs</h1>
            </div>
        );
    }
}
export default PopularLabs;