import React from 'react';
import reqwest from 'reqwest';

class OrderSummaryPage extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popularLabs:[],
			gotList:false
        }
    }

    componentDidMount(){
        
	}

    render(){
      
        return (
            <div className="poplabs-main ">
                <div className="banner-main">
                    <h1>Page Two</h1>
                    <p className="descrition-area">All labs that we have partnered with have been verified for quality and accuracy by our team of doctors. However, here's a list for the more brand conscious folks. With Flebie, you get to pick a lab that you have always sworn your allegiance for. We make sure we add a dash of us to make the whole experience much more convenient and rewarding. This list will also be updated based on the consumer behaviour with time.</p>
                </div>

            </div>
        );
    }
}
export default OrderSummaryPage;