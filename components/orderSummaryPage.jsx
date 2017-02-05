import React from 'react';
import reqwest from 'reqwest';

class OrderSummaryPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            order: null,
            loadedOrder: null,
            listLoadError: null,
        }
    }
    loadOrder() {
        var _this = this;
        reqwest({
            url: "/getOrderSummary"
            , headers: {
                "Access-Control-Allow-Origin": "*"
            }
            , method: 'get'
            , error: function (err) {
                _this.setState({
                    getLists: [],
                    loadedList: true,
                    listLoadError: true
                })
            }
            , success: function (resp) {
                _this.setState({
                    order: resp,
                    loadedOrder: true,
                    listLoadError: false
                })
            }
        });
    }
    componentDidMount(){

            this.loadTests.bind(this)();

            /*najax.get({
             url: "http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests", 
             method:"get",
             headers: {"Access-Control-Allow-Origin":"*"},
             cache: false,
             success: function(resp){                          
             _this.setState({
             getLists:JSON.parse(resp),
             loadedList:true,
             listLoadError:false
             })                  
             }, error: function (err) {
             _this.setState({
             getLists:[],
             loadedList:true,
             listLoadError:true
             })  
             }           
             }); */
        }
    

    render(){
        var orderDetails = null;

        if(this.state.loadedOrder != null && listLoadError == true)
        {
            orderDetails =
                <table cellSpacing="0" cellPadding="5" frameBorder="0" style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <td>Hi //orderValue.firstName</td><br/><br/>
                    </tr>
                    <tr>Thanks for placing order with Flebie. This email contains important information regarding your recent purchase. Please save it for reference.</tr>
                    <tr>
                        <td>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Lab Name: //orderValue.labName</strong><br/>//orderValue.labAddress</td>
                    </tr>
                    <tr>
                        <td>
                            <hr/>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>OrderID:</strong>	//orderValue.orderId</td>
                    </tr>
                    <tr>
                        <td><strong>Date & Time:</strong>	//orderValue.scheduleDate} //orderValue.scheduleTime</td>
                    </tr>
                    <tr>
                        <td>
                            <hr/>
                        </td>
                    </tr>
                    </tbody>
                </table>;
            
        }
        return (
            <div className="orderSummaryPage-main ">
                <table cellSpacing="0" cellPadding="0" width="600" bgColor="#fff" style={{align: "center"}} className="wrappertable">
                    <tbody>
                    <tr>
                        <td style={{align: "center", verticalAlign: "top"}} width="100%">
                            <table cellSpacing="0" cellPadding="0" width="100%" bgColor="#fff">
                                <tbody>
                                <tr>
                                    <td width="100%"><img src="http://pizzaonline.dominos.co.in/assets/email/spacer.gif" alt="" style={{display:block, border:0, height: "15px"}}/></td>
                                </tr>
                                <tr>
                                    <td width="100%">
                                        <table cellSpacing="0" cellPadding="0" width="100%">
                                            <tbody>
                                            <tr>
                                                <td width="100%">
                                                    <table cellSpacing="0" cellPadding="0" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td width="25px"><img src="http://pizzaonline.dominos.co.in/assets/email/spacer.gif" alt=""/></td>
                                                            <td><img src="http://cdn-flebie.parseapp.com/img/emailbanner.PNG" alt="" width="100%" style={{maxWidth: "600px", marginLeft: "10px"}}/></td>
                                                            <td width="25px"><img src="http://pizzaonline.dominos.co.in/assets/email/spacer.gif" alt=""/></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%"><img src="http://pizzaonline.dominos.co.in/assets/email/spacer.gif" alt="" style={{display:"block", border: 0, height: "20px"}}/></td>
                                </tr>
                                </tbody>
                            </table>
                            <table cellSpacing="0" cellPadding="0" width="100%">
                                <tbody>
                                <tr>
                                    <td width="100%" style="width:100%; padding:0; margin:0;"><img src="http://pizzaonline.dominos.co.in/assets/email/shadow.jpg" alt="" width="100%" frameBorder="0" style={{padding:0, margin:0, display: "block"}}/></td>
                                </tr>
                                </tbody>
                            </table>
                            
                            
                            {orderDetails}
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}
export default OrderSummaryPage;