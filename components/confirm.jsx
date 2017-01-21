import React from 'react';
import reqwest from 'reqwest';

class ConfirmCtrl extends React.Component {
    constructor(props){
		super(props);
        this.state={
            confirmResponse:{
                items:[],
                totalItems:0,
                labname:"",
                totalListPrice:0,
                totalPrice : 0
            }
        }
    }
    getConfirmResponse(){
        var list= {
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
                })
    }
    componentDidMount(){
        this.getConfirmResponse.bind(this)()
	}
    render(){
        var listUI=[];
    var _this = this;
    var headerUI= <h3 className="">{this.state.confirmResponse.labname}</h3>
      var head=<div className="test-head-row">
        <div className="item-head">
        TESTNAME        
        </div>
        <div className="item-qnt">
        QTY
        </div>
        <div className="item-mrp">
        MRP
        </div>
        <div className="item-price">
        PRICE
        </div>
      </div>;
      var list =  this.state.confirmResponse.items.map(function(item,index){
          return <div className="test-row">
            <div className="item-head">
            {item.testname}
            </div>
            <div className="item-qnt">
            
            {item.quantity}
            </div>
            <div className="item-mrp">
            <span className="icon icon-rupee"></span>{item.listPrice}
            </div>
            <div className="item-price">
            <span className="icon icon-rupee"></span>{item.price}
            </div>
          </div>
        });
        var priceUI=<div className="price-row test-row">
          <div  className="price-tot-label item-head">You Pay</div>
          <div className="item-qnt"> </div>
          <div className="item-mrp"></div>
          <div className="item-price"><span className="icon icon-rupee"></span>{this.state.confirmResponse.totalPrice}</div>
        </div>;
        listUI = <div className="list-content">
      {head}
       {list}
       {priceUI}
      </div>

        return (<div className="confirm-main">
            <div className="banner-main">
                
            </div>
            <div className="content-main confirm-test-main">
                <h2 className="confirm-head">Thank You for your order with us. Please check your inbox for your order details.  <br/>
                    <span className="icon icon-smile"/>
                </h2>
                {listUI}
            </div>
        </div>);
    }
}
export default ConfirmCtrl;