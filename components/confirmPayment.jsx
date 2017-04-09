import React from 'react';
import reqwest from  'reqwest';
class ConfirmPayment extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			loading:true
		}
	}
	componentWillMount(){
		
	}
	processAll(){
		var _this = this;
		//debugger;
		var payLoad = this.props.data;
		reqwest({			
				url:"/processAll?id="+Fleb.getQueryVariable("id")
				, type: 'json'
				,data:JSON.stringify(payLoad)
				, contentType: 'application/json'
				, method: 'post'
				, error: function (err) { 
					debugger;
				}
				, success: function (resp) {
					debugger;
					location.href="paymentresponse?id="+resp.orderid;
					//document.write = resp.html;
					//_this.refs.emailTemplate.innerHTML = resp.html;
				}
		});
		
 
	}
	componentDidMount(){
		//debugger;
		var  testsList={
			orderItems:[],
			totalItems:0,
			labName:"",
			totalListPrice:0,
			totalPrice : 0
		};
		Fleb.eventDispatcher("updateCart",testsList);
		this.processAll.bind(this)();
		//console.log("props are: "+JSON.parse(document.getElementById("dataDump").getAttribute("value")));
	}
	getResults(e){

	}
	setSearchParams(e){
	
	}
	removeItem(e){
	

	}
	goToSearch(e){
	
	}
	render(){
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
				<div className="processing-req"><p>Please Wait, We are processing your request!!!</p></div>
			</div>;
		return (<div className="banner-main">
			{loader}
		 </div> );
	}
}

export default ConfirmPayment;

/*

			*/