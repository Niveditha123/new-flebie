import React from 'react';
import reqwest from 'reqwest';

class ConfirmCtrl extends React.Component {
    constructor(props){
		super(props);
        this.state={
            confirmResponse:{
                orderItems:[],
                grossTotal:0,
            },
            error:false,
            loading:true,
            convenienceFee:0
            
        }
    }
    getConfirmResponse(){
       /* var list= {
            "totalItems": 3,
            "totalPrice": 1269,
            "totalListPrice": 1410,
            "items": [
                {
                "testname": "Total Iron Binding Capacity (TIBC)",
                "price": 189,
                "listPrice": 210,
                "quantity": 1,
                "isHomeCollectible": true,
                "labtestid": "QH9hPLiNmH"
                },
                {
                "testname": "Thyroxine Binding Globulin (TBG), Serum",
                "price": 540,
                "listPrice": 600,
                "quantity": 2,
                "isHomeCollectible": true,
                "labtestid": "FiKTBW1HXr"
                }
            ],
            "userEmail": "",
            "homeCollectible": true,
            "labname": "Thyrocare",
            "labId": "DhdJqyTrhg",
            "labAddress": "#5/3/1, 24th Main, Parangipalya, HSR Layout, Sector-2, Bangalore - 560102."
            };
                this.setState({
                    confirmResponse:list
                })*/


                var _this = this;

				var qP = Fleb.getQueryVariable("id");
                

				reqwest({			
					url:"/getOrder?id="+qP
					,headers:{
						"Access-Control-Allow-Origin":"*"
					}
					, method: 'get'
					, error: function (err) {
                        Fleb.hideLoader();
						_this.setState({
                            error:true,
                            loading:false						
						})  
					}
					, success: function (resp) {
						_this.setState({
							confirmResponse:resp,
                            error:false,
                            loading:false,
                            convenienceFee:resp.convenienceFee
						});     
                        Fleb.hideLoader();
					}
			})


    }
    componentDidMount(){
        Fleb.showLoader();
        var cartList= {
					orderItems:[],
					totalItems:0,
					labName:"",
					totalListPrice:0,
					totalPrice : 0
				};
        Fleb.eventDispatcher("updateCart",cartList);
        this.getConfirmResponse.bind(this)()
	}
    render(){
        var listUI=[];
    var _this = this;
      var head= null;
        if(this.state.confirmResponse.orderOriginPerson != 2)
        {
            head = <div className="test-head-row">
                <div className="item-head">
                    TESTNAME
                </div>
                <div className="item-qnt">
                    QTY
                </div>
                <div className="item-price">
                    PRICE
                </div>
                <div className="item-mrp">
                    MRP
                </div>
            </div>;
        }
        else {
            head = <div className="test-head-row">
                <div className="item-head">
                    TESTNAME
                </div>
                <div className="item-qnt">
                    QTY
                </div>
                <div className="item-price">
                    PRICE
                </div>
            </div>;
        }
        
          
      var list=[];

      
    if(!this.state.error && !this.state.loading){
         var list =  null;
        if(this.state.confirmResponse.orderOriginPerson != 2)
        {
            list = this.state.confirmResponse.orderItems.map(function(item,index){
                return <div className="test-row">
                    <div className="item-head">
                        {item.testName}
                    </div>
                    <div className="item-qnt">

                        {item.quantity}
                    </div>
                    <div className="item-price">
                        <span className="icon icon-rupee"></span>{item.itemTotal}
                    </div>
                    <div className="item-mrp">
                        <span className="icon icon-rupee"></span>{item.itemMRP}
                    </div>
                </div>
            });
        }
        else 
        {
            list = this.state.confirmResponse.orderItems.map(function(item,index){
                return <div className="test-row">
                    <div className="item-head">
                        {item.testName}
                    </div>
                    <div className="item-qnt">

                        {item.quantity}
                    </div>
                    <div className="item-price">
                        <span className="icon icon-rupee"></span>{item.itemTotal}
                    </div>
                </div>
            });
        }
             
        var convenienceFee= priceUI=<div className="price-row test-row">
          <div  className="price-tot-label item-head">convenience Fee</div>
          <div className="item-qnt"> </div>
          <div className="item-mrp"></div>
          <div className="item-price"><span className="icon icon-rupee"></span>{this.state.convenienceFee}</div>
        </div>;
        var priceUI= null;
        if(this.state.confirmResponse.orderOriginPerson != 2)
        {
           priceUI = <div className="price-row test-row">
               <div  className="price-tot-label item-head">You Pay</div>
               <div className="item-qnt"> </div>
               <div className="item-mrp"></div>
               <div className="item-price"><span className="icon icon-rupee"></span>{this.state.confirmResponse.grossTotal+this.state.convenienceFee}</div>
           </div>; 
        }else 
        {
            priceUI = <div className="price-row test-row">
                <div  className="price-tot-label item-head">You Pay</div>
                <div className="item-qnt"> </div>
                <div className="item-price"><span className="icon icon-rupee"></span>{this.state.confirmResponse.grossTotal+this.state.convenienceFee}</div>
            </div>;
        }
            
        
            
        listUI = <div className="list-content">
      {head}
       {list}
       {convenienceFee}
       {priceUI}
      </div>
    }else{
        list =<div className="no-content">
            <p> Not able to get the order details</p>
        </div>
        
    }
    

        return (<div className="confirm-main">
            <div className="banner-main">
                
            </div>
            <div className="content-main confirm-test-main">
                <h2 className="confirm-head">Thank You for your order with us. Please check your inbox for your order details.  <br/>
                    <span className="icon icon-smile"/>
                </h2>
                <h3 className="">Order Summary</h3>
                
                {listUI}
            </div>
        </div>);
    }
}
export default ConfirmCtrl;