import React from 'react';
import reqwest from 'reqwest';
var NotificationSystem = require('react-notification-system');
//var najax =  require('najax');

class TestList extends React.Component {
    constructor(props){
		super(props);
		
        this.state={
            testList:{
                orderItems:[]
            },
			labDetails:"",
			loaded:false,
			currentPage:0,
			filtered:false,
			filterList:[],
			inputFilter:"",
			user: null,
			_notificationSystem: null
        };
		
    }
 _addNotification(data) {
    this.state._notificationSystem.addNotification({
      message: data,
      level: 'success'
    });
  }
	getUser(){
		var _this = this;
        console.log("Entered get current user");
		reqwest({
			url:"/getCurrentUser"
			,headers:{
				"Access-Control-Allow-Origin":"*"
			}
			, method: 'get'
			, error: function (err) {
				console.log("Got an error ");
				_this.setState({
					testList:{
						orderItems:[]
					},
					loaded:false,
					labId:qP
				})
			}
			, success: function (resp) {

				console.log("Role in response is: "+JSON.stringify(resp));

				_this.setState({
					user: resp
				});
			}
		});
		

	}
  
  
	ChangeInput(e){
		this.setState({
			inputFilter:e.target.value
		},function(){
			this.filteringList.bind(this)()
		})
		
	}
	filteringList(){
		var _this = this;
		var newList=[];
		for(var i=0;i <this.state.testList.orderItems.length;i++){
			var item = this.state.testList.orderItems[i];
			var name = item.labTestName.toLowerCase();
			if(name.indexOf(_this.state.inputFilter.toLowerCase()) > -1){
				newList.push(item)
			}
		};

		this.setState({
			filterList:newList			
		})

	}
    loadAllTests(){
		var _this=this;
		//http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromLabId?labId=1

			var qP = Fleb.getQueryVariable("labId");
			var list={
				orderItems:[]
            };
		      /*  najax.get({
            url: "http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromLabId?labId="+qP, 
						method:"get",    
            cache: false,
            success: function(resp){                          
                //$("#result").html(returnhtml); 
				console.log(resp,"resp");  
				list.items = JSON.parse(resp); 
				_this.setState({
							 testList:list,
			  				loaded:true,
							  labId:qP
						})                
            }           
        });  */
			reqwest({			
					url:"/getLabTestsFromLabId?labId="+qP
					,headers:{
						"Access-Control-Allow-Origin":"*"
					}
					, method: 'get'
					, error: function (err) {
						_this.setState({
							testList:{
								orderItems:[]
							},
			  				loaded:false,
							  labId:qP
						})  
					}
					, success: function (resp) {
						if(Array.isArray(resp)){
							
							
							_this.setState({
								testList:{
									orderItems:resp
								},
								loaded:true,
								labId:qP
							})   
						}
						  
					}
			})




    }
	loadLabDetails(){
		var _this = this;
		var qP = Fleb.getQueryVariable("labId");
		Fleb.showLoader();
		reqwest({			
			url:"/getLab?id="+qP
			,headers:{
				"Access-Control-Allow-Origin":"*"
			}
			, method: 'get'
			, error: function (err) {
				_this.setState({
					labDetails:""
				})  ;
				Fleb.hideLoader();
			}
			, success: function (resp) {
				_this.setState({
						labDetails:resp
				})    
				Fleb.hideLoader(); 
			}
	})
	}
    componentDidMount(){
    	this.getUser.bind(this)();
		this.loadAllTests.bind(this)();
		/*Fleb.eventDispatcher("updateCart",{
        orderItems:[],
        totalItems:0,
        labName:"",
        totalListPrice:0,
        totalPrice : 0
      })*/
		this.loadLabDetails.bind(this)();
		//debugger;
		this.setState({
		_notificationSystem : this.refs.notificationSystem
	});
	}
	findAnItem(item,list,prop){
		var found={
			data:{},
			pos:0,
			in:false
		};
		for(var i=0;i<list.length;i++){
				if(item == list[i][prop]){
					found.data=list[i];
					found.in=true;
					found.pos=i;
					break;
				}
			}
		return found;
	}
	addTests(e){
		var test = e.target.getAttribute("data-name"),
			testItem={};
		var cartList = localStorage.getItem("cartInfo");
		if(cartList){
			cartList = JSON.parse(cartList);


			if(cartList.labName !== this.state.labDetails.labName){
				cartList= {
					orderItems:[],
					totalItems:0,
					labName:"",
					totalListPrice:0,
					totalPrice : 0
				}
			} 
			var item = this.findAnItem(test,cartList.orderItems,"testName");
			var newitem = this.findAnItem(test,this.state.testList.orderItems,"labTestName");
			if(item.in){
				cartList.orderItems[item.pos].quantity+=1;
				cartList.totalItems+=1;
				cartList.totalListPrice +=newitem.data.MRP;
				if(this.state.user != null && this.state.user.role == "LABADMIN")
				{
					
					cartList.totalPrice +=newitem.data.MRP;
				}
				else {
					cartList.totalPrice +=newitem.data.offerPrice;
				}
				
			}
			else{
				
					if(newitem.in){
						var testItem = null;
						if(this.state.user != null && this.state.user.role == "LABADMIN")
						{
							

							testItem = {
								"testName": newitem.data.labTestName,
								"price": newitem.data.MRP,
								"listPrice": newitem.data.MRP,
								"quantity": 1,
								"isHomeCollectible":false,
								"labTestId": newitem.data.labTestId
							};
							
						}else {
							testItem = {
								"testName": newitem.data.labTestName,
								"price": newitem.data.offerPrice,
								"listPrice": newitem.data.MRP,
								"quantity": 1,
								"isHomeCollectible":false,
								"labTestId": newitem.data.labTestId
							};
						}
						cartList.orderItems.push(testItem);
						cartList.totalItems+=1;
						cartList.totalListPrice+=testItem.listPrice;
						cartList.totalPrice+=testItem.price;
						cartList["userEmail"]="";
						cartList["isHomeCollectible"]=this.state.labDetails.isAvailableForHC;
						cartList["labName"]= this.state.labDetails.labName;
						cartList["labId"]= this.state.labDetails.labId;
						cartList["location"]= this.state.labDetails.location;
						cartList["operatingHours"]= this.state.labDetails.operatingHours;
						cartList["phoneNumber"] =this.state.labDetails.phoneNumber;
						cartList["labAddress"]= this.state.labDetails.address;
						cartList["inHouseConsultationAvailable"]= this.state.labDetails.inHouseConsultationAvailable;
						cartList["isAvailableForHC"]= this.state.labDetails.isAvailableForHC;
						cartList["isAvailableForOB"]= this.state.labDetails.isAvailableForOB;
					}
				}
				var testMsg = test+" successfully added to your cart!!!"
				this._addNotification(testMsg);

				Fleb.eventDispatcher("updateCart",cartList);
				if(cartList.totalItems == 1){
					document.getElementById("openCart").click();
				}				
			}
			else{
				var cartInfo = {
					"userEmail":"",
					"isHomeCollectible": this.state.labDetails.isAvailableForHC,
					"labName": this.state.labDetails.labName,
					"labId": this.state.labDetails.labId,
					"location": this.state.labDetails.location,
					"operatingHours": this.state.labDetails.operatingHours,
					"phoneNumber": this.state.labDetails.phoneNumber,
					"labAddress": this.state.labDetails.address,
					"inHouseConsultationAvailable": this.state.labDetails.inHouseConsultationAvailable,
					"isAvailableForHC": this.state.labDetails.isAvailableForHC,
					"isAvailableForOB": this.state.labDetails.isAvailableForOB,
					orderItems:[]
				}
				var cartItem = this.findAnItem(test,this.state.testList.orderItems,"labTestName");
				var newTest = null;

			if(this.state.user != null && this.state.user.role == "LABADMIN")
			{
				
				newTest = {
					"testName": cartItem.data.labTestName,
					"price": cartItem.data.MRP,
					"listPrice": cartItem.data.MRP,
					"quantity": 1,
					"isHomeCollectible":false,
					"labTestId": cartItem.data.labTestId
				};
				
			}
			else 
			{
				newTest = {
					"testName": cartItem.data.labTestName,
					"price": cartItem.data.MRP,
					"listPrice": cartItem.data.offerPrice,
					"quantity": 1,
					"isHomeCollectible":false,
					"labTestId": cartItem.data.labTestId
				};
			}
			
				
				cartInfo.orderItems.push(newTest);
				cartInfo.totalItems=1;
				cartInfo["totalListPrice"]=cartItem.data.MRP;
				cartInfo["totalPrice"]=cartItem.data.offerPrice;

				Fleb.eventDispatcher("updateCart",cartInfo);	
				if(cartList.totalItems == 1){
					document.getElementById("openCart").click();
				}								

		}
		
	}
	getRows(item,index){
				console.log("Current user is: "+this.state.user.role);
				var row = null;
				if(this.state.user != null && this.state.user.role == "LABADMIN")
				{
					

					row = <div key={index} className="tb-bd-row col4">
						<div className="test-name">{item.labTestName}</div>
						<div className="of-price"><span className="icon icon-rupee"/>{item.MRP}</div>
						<div className="action-col">
							<button id={index} onClick={this.addTests.bind(this)} data-name={item.labTestName} className="btn btn-success">Add</button>
						</div>
					</div>;
				}
				else 
				{
					row = <div key={index} className="tb-bd-row col4">
						<div className="test-name">{item.labTestName}</div>
						<div className="of-price"><span className="icon icon-rupee"/>{item.offerPrice}</div>
						<div className="mrp-price"><span className="icon icon-rupee"/>{item.MRP}</div>
						<div className="action-col">
							<button id={index} onClick={this.addTests.bind(this)} data-name={item.labTestName} className="btn btn-success">Add</button>
						</div>
					</div>;
					
				}
				
				return row;
	}
    render(){
		var labdetailsUI =[];
		var listTableUI=[];
		var labListHeader=[];
		var listTableContent=[];
		var _this=this;
		if(this.state.labDetails !== ""){
			labdetailsUI = <div className="clearfix">
				<h3>{this.state.labDetails.labName}</h3>
				<div>
					<span className="icon icon-clock"/>{this.state.labDetails.operatingHours}
				</div>
				<div>
					<span className="icon icon-phone"/>{this.state.labDetails.phoneNumber}
				</div>
				<div>
					<span className="icon icon-location"/>{this.state.labDetails.address}
				</div>
			</div>
		}
		if(this.state.loaded){
			if(this.state.user != null && this.state.user.role == "LABADMIN")
			{
				
				labListHeader=<div className="tb-head-row col4">
					<div className="test-name">TEST NAME</div>
					<div className="of-price">OFFER PRICE</div>
					<div className="action-col"></div>
				</div>;
				
			}
			else {
				labListHeader=<div className="tb-head-row col4">
					<div className="test-name">TEST NAME</div>
					<div className="of-price">OFFER PRICE</div>
					<div className="mrp-price">MRP</div>
					<div className="action-col"></div>
				</div>
			}
			
			listTableUI.push(labListHeader);
			if(!this.state.inputFilter){
				listTableContent = this.state.testList.orderItems.map(_this.getRows.bind(this));					
			}else{
				listTableContent = this.state.filterList.map(_this.getRows.bind(this));				
			}
			listTableUI.push(listTableContent);
		}
        return (
            <div className="clearfix test-list-main">
			<NotificationSystem ref="notificationSystem" />
                <div className="lab-details">
					{labdetailsUI}
				</div>
				<div className="test-table">
					<div className="clearfix">
						<div className=" fr search-bar">
							<label>Search:</label>
							<input className="form-control" defaultValue={this.state.inputFilter} onChange={this.ChangeInput.bind(this)}/>
						</div>
						{listTableUI}

					</div>
				</div>
            </div>
        );
    }
}
export default TestList;