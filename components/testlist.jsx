import React from 'react';
import reqwest from 'reqwest';
var NotificationSystem = require('react-notification-system');
var najax =  require('najax');

class TestList extends React.Component {
    constructor(props){
		super(props);
        this.state={
            testList:{
                items:[]
            },
			loaded:false,
			currentPage:0,
			filtered:false,
			filterList:[],
			inputFilter:"",
			_notificationSystem: null,
        }
    }
 _addNotification(data) {
    this.state._notificationSystem.addNotification({
      message: data,
      level: 'success'
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
		for(var i=0;i <this.state.testList.items.length;i++){
			var item = this.state.testList.items[i];
			var name = item.testname.toLowerCase();
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
                items:[]
            }
		        najax.get({
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
        });  
    }
    componentDidMount(){
		this.loadAllTests.bind(this)();
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
			var item = this.findAnItem(test,cartList.items,"testname");
			if(item.in){
				cartList.items[item.pos].quantity+=1;
				cartList.totalItems+=1;
				cartList.totalListPrice +=item.data.listPrice;
				cartList.totalPrice +=item.data.price;
			}
			else{
				var newitem = this.findAnItem(test,this.state.testList.items,"testname");
					if(newitem.in){
						testItem= newitem.data;
						testItem.quantity=1;
						cartList.items.push(testItem);
						cartList.totalItems+=1;
						cartList.totalListPrice+=testItem.MRP;
						cartList.totalPrice+=testItem.offerPrice;
					}
				}
				var testMsg = test+" successfully added to your cart!!!"
				this._addNotification(testMsg);
			Fleb.eventDispatcher("updateCart",cartList);				
			}
			else{
				var cartInfo = {
					"userEmail": this.state.testList.userEmail,
					"homeCollectible": this.state.testList.homeCollectible,
					"labname": this.state.testList.labTestName,
					"labId": this.state.testList.labId,
					"location": this.state.testList.location,
					"operatingHours": this.state.testList.operatingHours,
					"phoneNumber": this.state.testList.phoneNumber,
					"labAddress": this.state.testList.labAddress,
					"inHouseConsultationAvailable": this.state.testList.inHouseConsultationAvailable,
					"isAvailableForHC": this.state.testList.isAvailableForHC,
					"isAvailableForOB": this.state.testList.isAvailableForOB,
					items:[]
				}
				var cartItem = this.findAnItem(test,this.state.testList.items,"testname");
				cartItem.data.quantity=1;
				cartInfo.items.push(cartItem.data);
				cartInfo.totalItems=1;
				cartInfo["totalListPrice"]=cartItem.data.listPrice;
				cartInfo["totalPrice"]=cartItem.data.price;

				Fleb.eventDispatcher("updateCart",cartInfo);								

		}
		
	}
	getRows(item,index){
				var row= <div key={index} className="tb-bd-row col4">
					<div className="test-name">{item.labTestName}</div>
					<div className="of-price"><span className="icon icon-rupee"/>{item.offerPrice}</div>
					<div className="mrp-price"><span className="icon icon-rupee"/>{item.MRP}</div>
					<div className="action-col">
						<button id={index} onClick={this.addTests.bind(this)} data-name={item.labTestName} className="btn btn-success">Add</button>
					</div>
				</div>
				return row;
	}
    render(){
		var labdetailsUI =[];
		var listTableUI=[];
		var labListHeader=[];
		var listTableContent=[];
		var _this=this;
		if(this.state.loaded){
			labdetailsUI = <div className="clearfix">
				<h3>{this.state.testList.labname}</h3>
				<div>
					<span className="icon icon-clock"/>{this.state.testList.operatingHours}
				</div>
				<div>
					<span className="icon icon-phone"/>{this.state.testList.phoneNumber}
				</div>
				<div>
					<span className="icon icon-location"/>{this.state.testList.labAddress}
				</div>
			</div>
			labListHeader=<div className="tb-head-row col4">
				<div className="test-name">TEST NAME</div>
				<div className="of-price">OFFER PRICE</div>
				<div className="mrp-price">MRP</div>
				<div className="action-col"></div>
			</div>
			listTableUI.push(labListHeader);
			if(!this.state.inputFilter){
				listTableContent = this.state.testList.items.map(_this.getRows.bind(this));					
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