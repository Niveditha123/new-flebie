import React from 'react';
import reqwest from 'reqwest';
import SearchMain from '../client/scripts/search.js';

class Search extends React.Component {
    constructor(props){
		super(props);
		this.state={
			loading:true,
			gotList:false,
			labList:[],
			activeTab:"0test"
		}
    }
    loadLabs(){
        var _this = this;
		reqwest({			
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromTestNames?tests=Vitamin B6 (Pyridoxin), Serum;"
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests"
				//url:"/getMultiLabs"
				url:" http://lowcost-env.qxsdp2qnuv.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromTestNames?tests=Vitamin B6 (Pyridoxin), Serum;Vitamin E (Tocopherol), Serum"
				, type: 'json'
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
					console.log(err,"err")
					this.setState({
						loading:false,
						gotList:false
					})
				}
				, success: function (resp) {
					console.log(resp,"success");
						_this.setState({
							labList:resp,
							gotList:true,
							loading:false
						})
					}
				})
    }
    componentDidMount(){
        console.log("popular");
        //getMultiLabs
        this.loadLabs.bind(this)();
	}
	showMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-in";
	}
	hideMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-out";
	}
	openTestDesc(e){
		var currentTab= e.target.getAttribute("data-target");
		this.setState({
			activeTab:currentTab
		})
	}
	openKart(e){
		document.getElementById("openCart").click();
	}
    render(){
		var _this = this;
		var loader= <div className={(!this.state.loading)?"hide":"loader-wrap"}>
				<div className="sk-circle">
					<div className="sk-circle1 sk-child"></div>
					<div className="sk-circle2 sk-child"></div>
					<div className="sk-circle3 sk-child"></div>
					<div className="sk-circle4 sk-child"></div>
					<div className="sk-circle5 sk-child"></div>
					<div className="sk-circle6 sk-child"></div>
					<div className="sk-circle7 sk-child"></div>
					<div className="sk-circle8 sk-child"></div>
					<div className="sk-circle9 sk-child"></div>
					<div className="sk-circle10 sk-child"></div>
					<div className="sk-circle11 sk-child"></div>
					<div className="sk-circle12 sk-child"></div>
				</div>
			</div>;
		var labListUI=[];
		var testTabsUI =[];
		var testHeadUI=[];

		labListUI= this.state.labList.map(function(item,index){
			var lab = item.lab;
			var labTest = item.labTest;
			var test = item.test;
			var testUI= <div ref={index+"test"} className={(_this.state.activeTab== index+"test")?"tab-item fade-in":"fade-out"}>
			<h2>{test.testName}</h2>
			<p><span className="icon icon-flask"/>{test.sample}</p>
			<p className="test-desc">{test.description}</p>
			</div>
			var headUI = <button onClick={_this.openTestDesc.bind(_this)} data-target={index+"test"} className={(_this.state.activeTab== index+"test")?"btn btn-link tab-btn active-tab":"btn btn-link tab-btn"}>{test.testName}</button>
			testTabsUI.push(testUI);
			testHeadUI.push(headUI);
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
							<button onClick={_this.openKart.bind(this)} className="fr btn-btn-success bookme flebie-btn">BOOK ME</button>
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
            <div className="search-main">
				{loader}
				<div className="test-accord">
					<div className="tab-block">{testTabsUI}
					</div>
					<div className="clearfix tab-head-row">
					{testHeadUI}
					</div>
				</div>
				<div className="clearfix lab-lists">
				{labListUI}
				</div>
            </div>
        );
    }
}
export default Search;