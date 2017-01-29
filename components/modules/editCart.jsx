
import React from 'react';
import Modal from '../../components/utils/modal.jsx';


class ItemQ extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      var itemQ = <div  className="item-qnt"/>;
      if(this.props.isEditable){
        itemQ =  <div className="item-qnt">
            <button data-id={this.props.index} onClick={this.props.ctx.deleteOne.bind(this.props.ctx)} className="btn btn-naked icon icon-minus"></button>
            {this.props.item.quantity}
            <button data-id={this.props.index} onClick={this.props.ctx.addOne.bind(this.props.ctx)} className="btn btn-naked icon icon-plus"></button>
            <button data-id={this.props.index} onClick={this.props.ctx.deleteTest.bind(this.props.ctx)} className="btn btn-naked icon icon-bin"></button>
            </div>;
      }else{
        itemQ=<div className="item-qnt">
          <span>{this.props.item.quantity}</span>
        </div>
      }
    return(
      itemQ
    )
  }
};
class OpenCartModalContent extends React.Component{
  constructor(props){
		super(props);
    this.state={
      testsList:{
        items:[],
        totalItems:0,
        labname:"",
        totalListPrice:0,
        totalPrice : 0,
        openModal:false
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

    var testInfo={
        items:[],
        totalItems:0,
        labname:"",
        totalListPrice:0,
        totalPrice : 0
      }
    var localData= localStorage.getItem("cartInfo")
      this.setState({
        testsList:(localData)?JSON.parse(localData):testInfo
      })
    

  }
  componentDidMount(){
       this.getUserTests.bind(this)();
      document.body.addEventListener('updateCart',this.updateCart.bind(this));
      document.body.addEventListener('toggleCartModal',this.toggleCartModal.bind(this));
       
	}
  toggleCartModal(e){
    this.setState({
      openModal:e.data.flag
    })
  }
  updateCart(e){
    console.log(e.data,this.props.triggerElem,"yooo")
      this.setState({
      testsList:e.data.list
    },function(){
      localStorage.setItem("cartInfo", JSON.stringify(this.state.testsList));
    })
  }
  deleteOne(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    if(item.quantity == 1){
      dataList.items.splice( itemId, 1);
      this.setState({
        testInfo:{
          items:[],
          totalItems:0,
          labname:"",
          totalListPrice:0,
          totalPrice : 0
        }     
      },function(){
        localStorage.removeItem("cartInfo")
      })
    }else{
      item.quantity= item.quantity-1;
    }
    dataList.totalItems = dataList.totalItems-1;
    dataList.totalListPrice = dataList.totalListPrice-item.listPrice;
    dataList.totalPrice = dataList.totalPrice-item.price;
        Fleb.eventDispatcher("updateCart",dataList);


  }
  addOne(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    item.quantity= item.quantity+1;
    dataList.totalItems = dataList.totalItems+1;
    dataList.totalListPrice = dataList.totalListPrice+item.listPrice;
    dataList.totalPrice = dataList.totalPrice+item.price;
      Fleb.eventDispatcher("updateCart",dataList);


  }

  deleteTest(e){
    var itemId= e.target.getAttribute("data-id");
    var dataList = this.state.testsList;
    var item = dataList.items[itemId];
    dataList.items.splice( itemId, 1);
    dataList.totalItems = dataList.totalItems-item.quantity;
    dataList.totalListPrice = dataList.totalListPrice-(item.quantity*item.listPrice);
    dataList.totalPrice = dataList.totalPrice-(item.quantity*item.price);
    Fleb.eventDispatcher("updateCart",dataList);
  }
  gotoCheckout(e){
    location.href="/checkout";
  }
  openCartModal(e){
    Fleb.OpenModal(e)
  }
  gotoTestList(){
    var labId = this.state.testsList.labId;
    if(this.state.testsList.items.length > 0){
      location.href="/test/list?labId="+labId;
    }else{
      location.href="";
    }
  }
  render(){
    var listUI=[];
    var _this = this;
    var headerUI= <h3 className={(this.props.header)?"":"hide"}>{this.state.testsList.labname}</h3>
    if(this.state.testsList.items.length >0 ){
      var head=<div className="test-head-row">
        <div className="item-head">
        Item
        </div>
        <div className="item-qnt">
        Quantity
        </div>
        <div className="item-price">
        Price
        </div>
        <div className="item-mrp">
        MRP
        </div>
        
      </div>;

      var list =  this.state.testsList.items.map(function(item,index){
          return <div className="test-row">
            <div className="item-head">
            {item.testname}
            </div>
            <ItemQ item={item} isEditable={_this.props.isEditable} index={index} key={index} ctx={_this}/>
            <div className="item-price">
              <span className="icon icon-rupee"></span>{item.price*item.quantity}
            </div>
            <div className="item-mrp">
              <span className="icon icon-rupee"></span>{item.listPrice*item.quantity}
            </div>
            
            
          </div>
        });
        var discountUI=<div className="disc-row col2-row">
          <div  className="discount-label">You Saved</div>
          <div className="text-right"><span className="icon icon-rupee"></span>{this.state.testsList.totalListPrice-this.state.testsList.totalPrice}</div>
        </div>;
        var priceUI=<div className="price-row col2-row">
          <div  className="price-tot-label">Total Price</div>
          <div className="text-right"><span className="icon icon-rupee"></span>{this.state.testsList.totalPrice}</div>
        </div>;

      listUI = <div className="list-ui">
      <div className="list-cont-inner">
          <div className="list-content">
            {head}  
            {list}
          </div>
      </div>
      {discountUI}
      {priceUI}
      </div>
    }else{
      listUI = <div className="msg-block">
        You have not selected any test
      </div>
    }
    var cartUI =[];
    var cartContent = [];
    var cartNotification = <span onClick={this.openCartModal.bind(this)} data-target="cartPopUp" className="cart-badge">{this.state.testsList.totalItems}</span>
    if(this.props.triggerElem== true){
      cartUI.push( <button className="btn btn-link icon icon-shopping-cart" id="openCart" onClick={this.openCartModal.bind(this)} data-target="cartPopUp"/>);
      cartUI.push(cartNotification)
      cartContent = <div className={"clearfix"}>
      <div className="modal-body ">
        {listUI}
       </div>
       <div className="modal-footer clearfix">
        <label className={(this.state.testsList.items.length > 0)?"footer-label fl":"hide"} >{this.state.testsList.labname}</label>
        <button type="submit" onClick={this.gotoCheckout.bind(this)} data-dismiss="modal"  className={(this.state.testsList.items.length > 0)?"btn fr btn-success curved":"hide"}>
          Checkout</button>
        <button type="submit" onClick={this.gotoTestList.bind(this)}   className="btn fr  curved">
          Add Tests</button>
          
        </div>
       </div>;
      cartUI.push(<Modal open={this.state.openModal} selfClose={true}  
    id={"cartPopUp"} 
    headText={"Your Tests"}
    css="your-tests-pop"
      content={cartContent}/>);
    }else{
      cartUI = <div className="clearfix cart-summary">
      {headerUI}
      {listUI}
      </div>
    }
    return(
      <div className="cart-in">
      {cartUI}
      </div>
    )
  }
}
export default OpenCartModalContent;