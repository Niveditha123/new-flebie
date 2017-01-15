import React from 'react';
import reqwest from 'reqwest';

class PopularLabs extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popularLabs:[]
        }
    }
    loadPopLabs(){
        var popLabs = [
            {
                "lab": {
                "address": "Municipal No. 6a, 7th block, Jayanagar, Bengaluru",
                "averageWaitingTime": 15,
                "createdAt": "1900-01-01T00:00:00Z",
                "emailId": "",
                "inHouseConsultationAvailable": false,
                "isAvailableForHC": false,
                "isAvailableForOB": false,
                "isCap": false,
                "isDisplayable": true,
                "isISOCertified": false,
                "isNABLAccredited": false,
                "isPopular": false,
                "labId": 1,
                "labName": "Lucid Medical Diagnostics",
                "location": "Jayanagar",
                "operatingHours": "7 am - 10 pm (All Days)",
                "phoneNumber": 2147483647,
                "updatedAt": "1900-01-01T00:00:00Z"
                },
                "labTest": {
                "MRP": 4500,
                "cost": 3375,
                "createdAt": "1900-01-01T00:00:00Z",
                "isDrive": false,
                "isPopularPkg": false,
                "labId": 1,
                "labTestId": 1,
                "labTestName": "Vitamin B6 (Pyridoxin), Serum",
                "offerPrice": 4275,
                "testId": 875,
                "updatedAt": "1900-01-01T00:00:00Z"
                },
                "test": {
                "comments": "",
                "createdAt": "1900-01-01T00:00:00Z",
                "description": "More information about this test will soon be",
                "isDisplayable": true,
                "isFastingRequired": false,
                "isHomeCollectible": false,
                "isPopular": false,
                "sample": "Serum",
                "testId": 875,
                "testName": "Vitamin B6 (Pyridoxin), Serum",
                "type": "TEST",
                "updatedAt": "1900-01-01T00:00:00Z"
                }
            },
            {
                "lab": {
                "address": "Municipal No. 6a, 7th block, Jayanagar, Bengaluru",
                "averageWaitingTime": 15,
                "createdAt": "1900-01-01T00:00:00Z",
                "emailId": "",
                "inHouseConsultationAvailable": false,
                "isAvailableForHC": false,
                "isAvailableForOB": false,
                "isCap": false,
                "isDisplayable": true,
                "isISOCertified": false,
                "isNABLAccredited": false,
                "isPopular": false,
                "labId": 1,
                "labName": "Lucid Medical Diagnostics",
                "location": "Jayanagar",
                "operatingHours": "7 am - 10 pm (All Days)",
                "phoneNumber": 2147483647,
                "updatedAt": "1900-01-01T00:00:00Z"
                },
                "labTest": {
                "MRP": 4500,
                "cost": 3375,
                "createdAt": "1900-01-01T00:00:00Z",
                "isDrive": false,
                "isPopularPkg": false,
                "labId": 1,
                "labTestId": 2,
                "labTestName": "Vitamin E (Tocopherol), Serum",
                "offerPrice": 4275,
                "testId": 877,
                "updatedAt": "1900-01-01T00:00:00Z"
                },
                "test": {
                "comments": "",
                "createdAt": "1900-01-01T00:00:00Z",
                "description": "More information about this test will soon be",
                "isDisplayable": true,
                "isFastingRequired": false,
                "isHomeCollectible": false,
                "isPopular": false,
                "sample": "Serum",
                "testId": 877,
                "testName": "Vitamin E (Tocopherol), Serum",
                "type": "TEST",
                "updatedAt": "1900-01-01T00:00:00Z"
                }
            }
            ];
            this.setState({
                popularLabs:popLabs
            })
    }
    componentDidMount(){
        this.loadPopLabs.bind(this)();
	}
    showMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-in";
	}
	hideMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-out";
	}
    render(){
        var popLabsUI=[];
        var _this=this;
        popLabsUI=this.state.popularLabs.map(function(item,index){
            var lab = item.lab;
			var labTest = item.labTest;
			var test = item.test;
            return <div className="list-item">
					<div><div className="item-head">
						<button data-target={"labDetails"+index} onClick={_this.showMoreDetails.bind(_this)} className="btn btn-link icon icon-info"></button>
						<div className="fr price-block">
							<div className="striked-price"><span className="icon icon-rupee"/>{labTest.MRP}</div>
							<div className="actual-price"><span className="icon icon-rupee"/>{labTest.offerPrice}</div>
						</div>
					</div>
					<div className="lab-img img-block">
						<img src={"https://www.flebie.com/img/"+lab.labName+"_multi.jpg"}/>
					</div>
					<div className="lab-footer">
						<h3>{lab.labName}</h3>
						<h6>{lab.location}</h6>
						<div className="clearfix">
							<span className={(lab.isNABLAccredited)?"fl icon icon-checked":"hide"}/>
							<span className={(lab.isAvailableForHC)?"fl icon icon-homedelivery":"hide"}/>
							<span className={(lab.isAvailableForOB)?"fl icon icon-appointment":"hide"}/>
						</div>
					</div>
					<div ref={"labDetails"+index} className="lab-details fade-out">
					<div className="clearfix">
						<button data-target={"labDetails"+index} onClick={_this.hideMoreDetails.bind(_this)} className="fl btn btn-link icon icon-delete"/>
					</div>
					<div className="clearfix details-block">
						<div>
							<span className="icon icon-clock"/>{lab.operatingHours}
						</div>
						<div>
							<span className="icon icon-parking"/>{"Road side parking"}
						</div>
						<div>
							<span className="icon icon-waiting"/>{lab.averageWaitingTime+" mins"}
						</div>
						<div>
							<span className="icon icon-location"/>{lab.address}
						</div>
					</div>
				</div>
				</div>
			</div>
        })
        return (
            <div className="poplabs-main ">
                <div className="banner-main">
                    <h1>Popular Labs</h1>
                    <p className="descrition-area">All labs that we have partnered with have been verified for quality and accuracy by our team of doctors. However, here's a list for the more brand conscious folks. With Flebie, you get to pick a lab that you have always sworn your allegiance for. We make sure we add a dash of us to make the whole experience much more convenient and rewarding. This list will also be updated based on the consumer behaviour with time.</p>
                </div>
                <div className="content-main">
                    <div className="col3-main pop-labs lab-lists">
                        {popLabsUI}
                    </div>
                </div>
            </div>
        );
    }
}
export default PopularLabs;