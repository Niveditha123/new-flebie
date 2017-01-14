import React from 'react';
import reqwest from 'reqwest';

class PopularPackages extends React.Component {
    constructor(props){
		super(props);
    }
    componentDidMount(){
        console.log("popular");
	}
    render(){
        return (
            <div>
                <h1>Popular   hgkljlkjPackages</h1>
            </div>
        );
    }
}
export default PopularPackages;