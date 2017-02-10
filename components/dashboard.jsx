
var moment = require('moment');
var DatePicker = require('react-datepicker');
require('react-datepicker/dist/react-datepicker.css');
import { SingleDatePicker } from 'react-dates';
import React from 'react';
import reqwest from 'reqwest';

import TextareaAutosize from 'react-autosize-textarea';




class Dashboard extends React.Component {
    constructor(props){
		super(props);
        var labId = Fleb.getQueryVariable("labId");
        this.state={
            orders: null,
            loaded: false,
            startDate : moment(),
            slotDate : moment(),
            endDate : moment().add(1,"days"),
            labId: labId,
            timeSlotArray:[]    
        }
    }
    
    componentDidMount(){
        this.getOrders.bind(this)();
        this.getTimeSlots.bind(this)(this.state.startDate);
        
	}
    getTimeSlots(date){
        var _this = this;
        var date = moment(date).format('YYYY-MM-DD');
        reqwest({			
				url:"/getAvailableSlots?slotDate="+date
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
				}
				, success: function (resp) {
                    if(resp.timeSlots){
                        _this.setState({
                            timeSlotArray:resp.timeSlots,
                            slotDate: date
                        },function(){
                        })
                    }
				}
		})
    }
    date_sort_asc(date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
    }
    fetchTimeSlotsForTheDate() {

    console.log('Entered here');
    var dateObject = moment(document.getElementById("slotDate").value, 'YYYY-MM-DD').format('YYYY-MM-DD');
    console.log('Date object is: ' + dateObject);
    setTimeSelection(dateObject, restrictBookingAfter2PMOnCurrentDate, noTimeSlotLeftForToday);
   
    }
    handleStartDateChange(date){
        
    this.setState({
        startDate: date
    });
        this.getOrders();
    }
    handleEndDateChange(date){
        this.setState({
            endDate: date
        });
        this.getOrders();
    }
    
	getOrders(){
        var _this = this;
        _this.setState({
            loaded : false
            });

        var status = document.getElementById("statusFilter").value;
        var fromDate = document.getElementById("fromDate").value;
        var toDate = document.getElementById("toDate").value;
        var urlToUse = '';
        if (status == 'ALL') {
            urlToUse = "/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
        }
        else {
            urlToUse = "/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses=" + status + '&startDate=' + fromDate + '&endDate=' + toDate;
        }

        reqwest({
            url: urlToUse
            ,headers:{
                "Access-Control-Allow-Origin":"*"
            }
            , method: 'get'
            , error: function (err) {
                _this.setState({
                    error:true,
                    loaded:false
                })
            }
            , success: function (resp) {
                
                var orders = resp;
                if(orders.length != 0)
                {
                    
                    _this.setState({
                        orders: orders,
                        error:false,
                        loaded:true,
                        startDate: fromDate,
                        endDate: toDate
                    });
                    localStorage.removeItem('csvData');
                    localStorage.setItem('csvData', JSON.stringify(orders));
                }
                


            }
        })
        
    }
    handleSlotDateChange(date){
        this.getTimeSlots(date);
        
    }

    render(){

        var rowsOfOrders = null;
        var newOrderLink = null;
        var _this = this;
        if( this.state.loaded == true && this.state.orders != null)
        {

            rowsOfOrders = _this.state.orders.map(function(order,index){

                return  <tr><td><a className="btn btn-info" href={"/editOrder?id="+order.orderId}>{order.orderDetails.firstName}</a></td><td>{order.orderDetails.address}</td><td>{order.orderDetails.phoneNumber}</td><td>{order.status}</td><td>{order.scheduleTime}</td><td>{order.orderDetails.emailId}</td></tr>
            });

        }
            
        
        return (
            
            <div className="dashboard-main">
                <h1 style={{textAlign: "center"}}>LAB ADMIN DASHBOARD</h1>
                <div className="container-fluid" style={{backgroundColor: "rgba(255,255,255,0.60)"}} >
                    <div className="row">
                        <div className="col-xs-6">
                            <select id="statusFilter" style={{backgroundColor:"#00CF17", color:"black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}>
                                <option value="ALL">ALL</option>
                                <option value="UNASSIGNED">UNASSIGNED</option>
                                <option value="ASSIGNED">ASSIGNED</option>
                                <option value="COLLECTED">COLLECTED</option>
                                <option value="SUBMITTED">SUBMITTED</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                        <div className="col-xs-6 text-right">
                            <a className="btn btn-info"  href={`/test/list?labId=${this.state.labId}`} id="createANewOrder" style={{backgroundColor:"#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}> New Order</a>                       
                        </div>
                        
                    </div>
                    <div className="row mt12">
                        <div className="col-xs-4">
                            <label> CHECK AVAILABILITY</label>
                        </div>
                        <div className="col-xs-3">
                        <DatePicker id="slotDate" className="form-control" selected={this.state.slotDate} onChange={this.handleSlotDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>
                        </div>
                        <div className="col-xs-5">
                            <TextareaAutosize readOnly  className="form-control" value={this.state.timeSlotArray.join("\n")} defaultValue={this.state.timeSlotArray.join("\n")} style={{ minHeight: 40, maxHeight: 200 }} />
                        </div>
                    </div>    
                    <div className="row">
                            <div className="col-lg-10">
                            </div>
                            <div className="col-lg-2">
                                <button id="refreshButton"  onClick={this.getOrders.bind(this)} className="btn btn-info" style={{backgroundColor: "#00CF17", color:"black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", float: "right"}}>
                                    <span className="glyphicon glyphicon-refresh">  Refresh </span>
                                </button>
                            </div> 
                    </div>
                            <div className="row">
                                <div className="col-xs-6 form-inline">
                                    <label htmlFor="exampleInputName2">From</label>
                                    <DatePicker id="fromDate" selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>

                                </div>
                                
                                <div className="col-xs-6 form-inline">
                                <label htmlFor="exampleInputName21">To</label>
                                    <DatePicker id="toDate" selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>
                                </div>   
                            </div> 



                    <div id="products" className="row list-group table-responsive">
                        <table className="table" id="datatable">
                            <thead className="thead-inverse" width="100%">
                            <tr>
                                <th> NAME</th>
                                <th> ADDRESS</th>
                                <th> PHONE</th>
                                <th> STATUS</th>
                                <th> DATE/TIME</th>
                                <th> EMAIL</th>
                            </tr>
                            </thead>
                            <tbody id="bodyoftable">
                                {rowsOfOrders}
                            </tbody>

                        </table>
                        
                    <br/>
                    <br/>
                    </div>
                    <div className="row">
                        <button  className="btn btn-info" id="getCSVData" style={{ backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", textAlign: "right"}}>
                            <span className="glyphicon glyphicon-download-alt">Export</span>
                        </button>
                    </div>    
                </div>

            </div>
            
        );
    }
}
export default Dashboard;
