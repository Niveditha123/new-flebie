import React from 'react';
import reqwest from 'reqwest';

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
			inputFilter:""
        }
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
        var tests ={
	        "items": [{
	          "testname": "Total Iron Binding Capacity (TIBC)",
	          "price": 189,
	          "listPrice": 210,
	          "isHomeCollectible": true,
	          "labtestid": "QH9hPLiNmH"
	        }, {
	          "testname": "Thyroxine Binding Globulin (TBG), Serum",
	          "price": 540,
	          "listPrice": 600,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "Vitamin B6 (Pyridoxin), Serum",
	          "price": 840,
	          "listPrice": 900,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "1,25 Dihydroxy Vitamin D (Calcitriol)",
	          "price": 240,
	          "listPrice": 400,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "17 - Hydroxy Corticosteroids, Urine 24H (17 O",
	          "price": 140,
	          "listPrice": 240,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        },
            {
	          "testname": "17 - OH Progesterone, Serum (17 - Hydroxy Pro",
	          "price": 1040,
	          "listPrice": 1234,
	          "isHomeCollectible": true,
	          "labtestid": "FiKTBW1HXr"
	        }
            ],
	        "userEmail": "",
	        "homeCollectible": true,
	        "labname": "Thyrocare",
	        "labId": "DhdJqyTrhg",
            "location": "Jayanagar",
            "operatingHours": "7 am - 10 pm (All Days)",
            "phoneNumber": 2147483647,
	        "labAddress": "#5/3/1, 24th Main, Parangipalya, HSR Layout, Sector-2, Bangalore - 560102.",
            "inHouseConsultationAvailable": false,
            "isAvailableForHC": false,
            "isAvailableForOB": false,
            "isCap": false,
            "isDisplayable": true,
            "isISOCertified": false,
            "isNABLAccredited": false,
	      };
          this.setState({
              testList:tests,
			  loaded:true
          })
    }
    componentDidMount(){
		this.loadAllTests.bind(this)();
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
						cartList.totalListPrice+=testItem.listPrice;
						cartList.totalPrice+=testItem.price;
					}
				}
			Fleb.eventDispatcher("updateCart",cartList);				
			}
			else{
				var cartInfo = {
					"userEmail": this.state.testList.userEmail,
					"homeCollectible": this.state.testList.homeCollectible,
					"labname": this.state.testList.labname,
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
					<div className="test-name">{item.testname}</div>
					<div className="of-price"><span className="icon icon-rupee"/>{item.price}</div>
					<div className="mrp-price"><span className="icon icon-rupee"/>{item.listPrice}</div>
					<div className="action-col">
						<button id={index} onClick={this.addTests.bind(this)} data-name={item.testname} className="btn btn-success">Add</button>
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