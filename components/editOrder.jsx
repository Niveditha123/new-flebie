import React from 'react';
import reqwest from 'reqwest';

class EditOrder extends React.Component {
    constructor(props){
        super(props);
        this.state={
            order:{
                orderItems:[],
                grossTotal:0,
            },
            role: null,
            userName: null,
            error:false,
            loading:true,
            convenienceFee:0
        }
    }

    componentDidMount(){
        Fleb.showLoader();
        this.getOrderAndOrderDetails.bind(this)();
	}
    getOrderAndOrderDetails(){
        
        var _this = this;
        var id = Fleb.getQueryVariable("id");

        reqwest({
            url:"/getOrder?id="+id
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
                    order:resp,
                    error:false,
                    loading:false
                });
                Fleb.hideLoader();
                
            }
        })


    }

    render(){

        var _this=this;
        if(!this.state.error && !this.state.loading){
            var orderDetailsForm =
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <label style={{fontStyle: "italic"}}>Order Id:</label>&nbsp;&nbsp;<span id="orderId" >{this.state.order.orderId}</span>
                        </div>
                        <div className="col-sm-6">
                            <label style={{fontStyle: "italic"}}>Patient Name:</label>&nbsp;&nbsp;
                            <input id="patientName" maxLength="10" minLength="3" required="required" defaultValue={this.state.order.orderDetails.firstName}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="age" style={{fontStyle: "italic"}}>Age:</label>&nbsp;&nbsp;
                            <input id="age" type="number" min="1" max="100" defaultValue={this.state.order.orderDetails.age}/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="phone" style={{fontStyle: "italic"}}>Phone:</label>&nbsp;&nbsp;
                            <input id="phone" type="number" required="required" defaultValue={this.state.order.orderDetails.phoneNumber}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="emailId" style={{fontStyle: "italic"}}>Email Id:</label>&nbsp;&nbsp;
                            <input id="emailId" type="email" required="required" style={{width: "60%"}} defaultValue={this.state.order.orderDetails.emailId}/>
                        </div>
                        <div className="col-sm-6">
                            <label style={{fontStyle: "italic"}}>Date/Time:</label>&nbsp;&nbsp;<span id="dateTime">{this.state.order.scheduleDate.split("T")[0]+":"+this.state.order.scheduleTime}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label id="paymentType" style={{fontStyle: "italic"}}>Payment Type:</label>&nbsp;&nbsp;<span id="paymentType">{this.state.order.paymentType}</span>
                        </div>
                        <div className="col-sm-6">
                            <label id="promoCode" style={{fontStyle: "italic"}}>Promo Code:</label>&nbsp;&nbsp;<span id="promoCode"> {this.state.order.promotionCode}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label htmlFor="address" style={{fontStyle: "italic"}}>Address:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="address" name="address" required="required" style={{width: "100%"}}>{this.state.order.orderDetails.address}</textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <label style={{fontStyle: "italic"}}>Lab Name:</label>&nbsp;&nbsp;<span>{this.state.order.orderDetails.labName}</span>
                        </div>
                        <div className="col-sm-6">
                            <label style={{fontStyle: "italic"}}>Cash To Collect:</label>&nbsp;&nbsp;<span>{this.state.order.grossTotal}  </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <label style={{fontStyle: "italic"}}>Order Comments:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea id="comments" name="comments" style={{width: "100%"}}>{this.state.order.orderComments}</textarea>
                        </div>
                        <input id="labId" className="hidden"/>
                    </div>
                </form>;
            var update = <button id="updateOrder" style={{backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}} className=" hidden btn btn-info">UPDATE</button>
            var addTests = <a id="addTestButton" href={`/test/list?labId=${this.state.order.labId}`} style={{backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}} className="hidden btn btn-info">ADD TESTS</a>;
            var backButton = <a id="goToDashboard" href="/dashboard" style={{backgroundColor: "red", color: "yellow", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}} className="btn btn-info">BACK</a>;
            var orderItems =  this.state.order.orderItems.map(function(item,index){
                return <tr>
                    <td>{item.testName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.itemTotal}</td>
                </tr>
            });
        }
        
        
        return (
            <div className="editOrder-main ">
                <h1 style={{color: "grey", textAlign: "center"}}>EDIT ORDER</h1>
                    <h4 className="hidden">ROLE:
                        <input id="role"/>
                    </h4>
                    <div style={{ textAlign: "center"}}><span id="message" style={{color: "red"}}/></div>
                    <div style={{backgroundColor: "lightyellow"}} className="container">
                        {orderDetailsForm}
                    </div>
                    <div className="container">
                        <div id="products" className="row list-group table-responsive">
                            <table id="datatable" className="table">
                                <thead className="thead-inverse">
                                <tr>
                                    <th>ITEM</th>
                                    <th>QUANTITY</th>
                                    <th>MRP</th>
                                </tr>
                                </thead>
                                <tbody id="databody"> 
                                    {orderItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container">
                        {addTests}
                        {backButton}
                    </div>
                    
                
                    <div id="cancelOrder" role="dialog" className="modal right fade text-muted">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 style={{fontStyle: "bold", color: "red"}}>CANCEL ORDER</h4>
                                </div>
                                <div className="modal-body"><span style={{fontStyle: "bold"}}>Are you sure you want to cancel this order?</span></div>
                                <div className="modal-footer">
                                    <button id="cancelOrderConfirmButton" style={{marginRight: "10px", backgroundColor: "#DBDBDB"}} className="btn btn-default pull-right contLabShop curved"><span className="glyphicon glyphicon-menu-left">Yes</span></button>
                                    <button id="cancelOrderCancelButton" style={{marginRight: "10px", backgroundColor: "#DBDBDB"}} className="btn btn-default pull-right contLabShop curved"><span className="glyphicon glyphicon-menu-left">No</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="updateOrderModal" role="dialog" className="modal right fade text-muted">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 style={{fontStyle: "bold", color: "red"}}>Update Order</h4>
                                </div>
                                <div className="modal-body"><span style={{fontStyle: "bold"}}>Are you sure you want to update this order?</span></div>
                                <div className="modal-footer">
                                    <button id="updateOrderConfirmButton" style={{marginRight: "10px", backgroundColor: "#DBDBDB"}} className="btn btn-default pull-right contLabShop curved"><span className="glyphicon glyphicon-menu-left">Yes</span></button>
                                    <button id="updateOrderCancelButton" style={{marginRight: "10px", backgroundColor: "#DBDBDB"}} className="btn btn-default pull-right contLabShop curved"><span className="glyphicon glyphicon-menu-left">No</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
export default EditOrder;