
import React from 'react';
class OpenCartModalContent extends React.Component{
  constructor(props){
		super(props);
    this.state={
      testsList:{
        items:[]
      }
    }
  }
  getUserTests(){
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
        testsList:list
    })

  }
  componentDidMount(){
       this.getUserTests.bind(this)();
	}
  deleteOne(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    if(item.quantity == 1){
      dataList.items.splice( itemId, 1)
    }else{
      item.quantity= item.quantity-1;
    }
    dataList.totalItems = dataList.totalItems-1;
    dataList.totalListPrice = dataList.totalListPrice-item.listPrice;
    dataList.totalPrice = dataList.totalPrice-item.price;
    this.setState({
      testsList:dataList
    })

  }
  addOne(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    item.quantity= item.quantity+1;
    dataList.totalItems = dataList.totalItems+1;
    dataList.totalListPrice = dataList.totalListPrice+item.listPrice;
    dataList.totalPrice = dataList.totalPrice+item.price;
    this.setState({
      testsList:dataList
    })

  }
  deleteTest(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    dataList.items.splice( itemId, 1);
    dataList.totalItems = dataList.totalItems-item.quantity;
    dataList.totalListPrice = dataList.totalListPrice-(item.quantity*item.listPrice);
    dataList.totalPrice = dataList.totalPrice-(item.quantity*item.price);
    this.setState({
      testsList:dataList
    })
  }
  gotoCheckout(e){
    location.href="checkout";
  }
  render(){
    var listUI=[];
    var _this = this;
    if(this.state.testsList.items.length >0 ){
      var head=<div className="test-head-row">
        <div className="item-head">
        Item
        </div>
        <div className="item-qnt">
        Quantity
        </div>
        <div className="item-mrp">
        MRP
        </div>
        <div className="item-price">
        Price
        </div>
      </div>;
      var list =  this.state.testsList.items.map(function(item,index){
          return <div className="test-row">
            <div className="item-head">
            {item.testname}
            </div>
            <div className="item-qnt">
            <button data-id={index} onClick={_this.deleteOne.bind(_this)} className="btn btn-naked icon icon-minus"></button>
            {item.quantity}
            <button data-id={index} onClick={_this.addOne.bind(_this)} className="btn btn-naked icon icon-plus"></button>
            <button data-id={index} onClick={_this.deleteTest.bind(_this)} className="btn btn-naked icon icon-bin"></button>
            </div>
            <div className="item-mrp">
            <span className="icon icon-rupee"></span>{item.listPrice}
            </div>
            <div className="item-price">
            <span className="icon icon-rupee"></span>{item.price}
            </div>
          </div>
        });
        var priceUI=<div className="price-row col2-row">
          <div  className="price-tot-label">Total Price</div>
          <div className="text-right"><span className="icon icon-rupee"></span>{this.state.testsList.totalPrice}</div>
        </div>;
        var discountUI=<div className="disc-row col2-row">
          <div  className="discount-label">You Saved</div>
          <div className="text-right"><span className="icon icon-rupee"></span>{this.state.testsList.totalListPrice-this.state.testsList.totalPrice}</div>
        </div>;

      listUI = <div className="list-content">
      {head}
       {list}
       {priceUI}
       {discountUI}
      </div>
    }else{
      listUI = <div className="msg-block">
        No test added!!
      </div>
    }
    return(<div className="clearfix">
      <div className="modal-body ">
        {listUI}
       </div>
       <div className="modal-footer clearfix">
        <label className="footer-label fl">{this.state.testsList.labname}</label>
        <button type="submit" onClick={this.gotoCheckout.bind(this)} data-dismiss="modal"  className="btn fr btn-success curved">
          checkout</button>
        <button type="submit" data-dismiss="modal"  className="btn fr  curved">
          Add Tests</button>
          
        </div>
       </div>
    )
  }
}
export default OpenCartModalContent;