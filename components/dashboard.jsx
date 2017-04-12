
var moment = require('moment');
var DatePicker = require('react-datepicker');
require('react-datepicker/dist/react-datepicker.css');
import { SingleDatePicker } from 'react-dates';
import React from 'react';
import reqwest from 'reqwest';




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
            availableTimeSlots: "",
            user: null,
            flebies: null,
            orderStatusMap: {},
            
            statusOfOrders: "ALL"
            
        }
    }
    
    componentDidMount(){
        this.getCurrentUser.bind(this)();
        this.getOrdersForCurrentDates.bind(this)();
        this.getAvailableSlots.bind(this)();
        this.getFlebies.bind(this)();
        
	}
   
    handleStartDateChange(date){
    
        this.setState({
            startDate : moment(date)
        });
        this.getOrders(date, this.state.endDate.toDate(), this.state.statusOfOrders);
        
        
        
    }
    handleEndDateChange(date){
        this.setState({
            endDate : moment(date)
        });
        this.getOrders(this.state.startDate.toDate(), date, this.state.statusOfOrders);
        
    }
    getCurrentUser(){
        var _this = this;

        var urlToUse = '';
            urlToUse = "/getCurrentUser";
        

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

                var user = resp;
                if(user != null)
                {
                    _this.setState({
                        user : user
                    });
                }



            }
        })

    }

    getFlebies(){
        var _this = this;

        var urlToUse = '';
        urlToUse = "/getFlebies";


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

                var flebies = resp;
                if((flebies != null) && (flebies.length > 0))
                {
                    console.log("Flebies are: "+JSON.stringify(flebies));
                    _this.setState({
                        flebies : flebies
                    });
                }



            }
        })

    }
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

//If JSONData is not an object then JSON.parse will parse the JSON string in an Object

    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

//Set Report title in first row or line

//This condition will generate the Label/Header

    if (ShowLabel) {

        var row = '';

//This loop will extract the label from 1st index of on array

        for (var index in arrData[0]) {

            if(index!= 'UserName1')

//Now convert each value to string and comma-seprated

                row += index + ',';

        }

        row = row.slice(0, -1);

//append Label row with line break

        CSV += row + '\r\n';

    }

//1st loop is to extract each row

    for (var i = 0; i < arrData.length; i++) {

        var row = '';

//2nd loop will extract each column and convert it in string comma-seprated

        for (var index in arrData[i]) {


            var data = null;
            data = arrData[i][index].toString().replace(/\r?\n|\r/g, " ").replace(/,/g,"");

            row += '' +data+ ',';

        }
        row = row.replace(/,\s*$/, "");
        var len = row.length - 1;
        row.slice(0, len);

//add a line break after each row

        CSV += row + '\r\n';

    }

    if (CSV == '') {

        alert('Invalid data');

        return;

    }

//Generate a file name

    var fileName = '';

//this will remove the blank-spaces from the title and replace it with an underscore

    fileName += ReportTitle.replace(/ /g, '');

//Initialize file format you want csv or xls

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    var blob = new Blob([CSV], { type: 'text/csv' }); //new way as anchor tag download not supported in latest chrome so use Blob

    var csvUrl = URL.createObjectURL(blob);  //Now file with proper filename is downloaded with proper extension

//this trick will generate a temp <a /> tag

    var link = document.createElement('a');

    link.href = csvUrl;

//set the visibility hidden so it will not effect on your web-layout

    link.style = 'visibility:hidden';

    link.download = fileName + '.csv';

//this part will append the anchor tag and remove it after automatic click

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}
    
    
    
    getOrdersForCurrentDates()
    {
        this.getOrders(this.state.startDate.toDate(),this.state.endDate.toDate(), this.state.statusOfOrders);
    }
    getOrdersAsCSVForADMIN(){
    var jsonData = localStorage.getItem('csvData');
    console.log("Json data is: "+jsonData);
    var requiredJsonData = [];

        for (var i in jsonData) {
            var requiredJson = {"orderId": jsonData[i].orderId, "name": jsonData[i].lab, "address": jsonData[i].orderDetails.address, "phone": jsonData[i].orderDetails.phone, "status": jsonData[i].status, "Date/Time": jsonData[i].scheduleDate.split("T")[0]+" "+jsonData[i].scheduleTime, "email": jsonData[i].orderDetails.emailId, "assigned": jsonData[i].assignedTo, "cash": jsonData[i].labName, "grossMRP": jsonData[i].grossMRP, "grossTotal": jsonData[i].grossTotal};
            requiredJsonData.push(requiredJson);
        }    
    this.JSONToCSVConvertor(JSON.parse(requiredJsonData), 'OrdersReport', 'Orders');
    }
    getOrdersAsCSVForLABADMIN(){
        var jsonData = localStorage.getItem('csvData');
        var requiredJsonData = [];
        for (var i in jsonData) {
            var requiredJson = {"orderId": jsonData[i].orderId};
            requiredJsonData.push(requiredJson);
        }
        //this.JSONToCSVConvertor(JSON.parse(jsonData), 'OrdersReport', 'Orders');
    }
    getOrdersAsCSVForFLEBIE(){
        var jsonData = localStorage.getItem('csvData');
        var requiredJsonData = [];
        for (var i in jsonData) {
            var requiredJson = {"orderId": jsonData[i].orderId};
            requiredJsonData.push(requiredJson);
        }
        //this.JSONToCSVConvertor(JSON.parse(jsonData), 'OrdersReport', 'Orders');
    }
    
    
    
    getOrdersOfGivenStatus(statusObject)
    {
        var _this = this;
        _this.setState({
            statusOfOrders : statusObject.target.value
        });
        this.getOrders(this.state.startDate.toDate(),this.state.endDate.toDate(), statusObject.target.value);
        _this.setState({
            statusOfOrders : statusObject.target.value
        });
    }
	getOrders(startDate,endDate, status){
        var _this = this;
        _this.setState({
            loaded : false
            });

        var fromDate = null;
        var toDate = null;
        if(startDate != null)
        {
            fromDate = moment(startDate).format("YYYY-MM-DD");
        }
        else {
            fromDate = _this.state.startDate.format("YYYY-MM-DD");
        }
        if(endDate != null)
        {
            toDate = moment(endDate).format("YYYY-MM-DD"); 
        }
        else 
        {
            toDate = _this.state.endDate.format("YYYY-MM-DD");
        }
            
        
            
            
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
                        loaded:true
                    });
                    localStorage.removeItem('csvData');
                    localStorage.setItem('csvData', JSON.stringify(orders));
                }
                


            }
        })
        
    }

    handleSlotDateChange(date){
        
        this.getAvailableSlots(date);
        
        
        
    }
    getAvailableSlots(date) {
        var _this = this;
        
        var slotDate = null;
        if(date != null)
        {
            slotDate = moment(date).format("YYYY-MM-DD");
        }
        else 
        {
            slotDate = document.getElementById("slotDate").value;
        }
            
        var urlToUse = "/getAvailableSlots?slotDate="+slotDate;

        reqwest({
            url: urlToUse
            ,headers:{
                "Access-Control-Allow-Origin":"*"
            }
            , method: 'get'
            , error: function (err) {
                _this.setState({
                    availableTimeSlots: null
                });
            }
            , success: function (resp) {
                console.log("Resp is: "+JSON.stringify(resp));
                var timeSlots = null;
                var timeSlotStringArray = [];
                if(resp.timeSlots != null && resp.timeSlots.length != 0)
                {
                    timeSlots = resp.timeSlots;
                    
                    for(var i in timeSlots)
                    {
                       timeSlotStringArray.push(timeSlots[i]+"-"+moment("1900-01-01 "+timeSlots[i], "YYYY-MM-DD h:mm:ss a").add(30, "minutes").format("h:mm:ss a"));
                    }
                    _this.setState({
                        availableTimeSlots: timeSlotStringArray.join("\n"),
                        slotDate : moment(slotDate,"YYYY-MM-DD")
                    });
                    
                }
                console.log("Timeslots are: "+timeSlots);



            }
        })
    }

    assignFlebieToOrder(orderIdAndFlebieUserId) {
        var _this = this;
        var orderId = orderIdAndFlebieUserId.target.value.split(":")[0];
        var flebieUserId = orderIdAndFlebieUserId.target.value.split(":")[1];

        var urlToUse = "/assignFlebieToOrder?flebieUserId="+flebieUserId;

        reqwest({
            url: urlToUse
            , type: 'json'
            ,data:JSON.stringify({orderId: orderId})
            , contentType: 'application/json'
            , method: 'put'
            , error: function (err) {
                
            }
            , success: function (resp) {
                var order = resp;
                if(order.assignedTo == flebieUserId)
                {
                    var orderStatusMap = _this.state.orderStatusMap;
                    orderStatusMap[order.orderId] = order.status;
                    _this.setState({
                        orderStatusMap: orderStatusMap
                    });
                    console.log("Successfully changed flebie");
                }
                
                



            }
        })
    }

    changeStatusOfOrder(orderObject){
        var _this = this;
        var orderId = orderObject.target.value;

        var urlToUse = "/changeStatusOfOrder";

        reqwest({
            url: urlToUse
            , type: 'json'
            ,data:JSON.stringify({orderId: orderId})
            , contentType: 'application/json'
            , method: 'put'
            , error: function (err) {

            }
            , success: function (resp) {
                var order = resp;
                
                    var orderStatusMap = _this.state.orderStatusMap;
                    orderStatusMap[order.orderId] = order.status;
                    _this.setState({
                        orderStatusMap: orderStatusMap
                    });
                    console.log("Successfully changed status");





            }
        })
    }
    changeAccessKeyTruthValue(){
        var _this = this;
        if(_this.state.accessKeyTruthValue != null)
        {
            if(_this.state.accessKeyTruthValue != true)
            {
                _this.setState({
                    accessKeyTruthValue: true
                });
            }
            else
            {
                _this.setState({
                    accessKeyTruthValue: false
                });
            }

        }
        else
        {
            _this.setState({
                accessKeyTruthValue: true
            });
            _this.setState({
                accessKey: document.cookie.split('ums=')[1].split(';')[0]
            });
        }

    }

    render(){
        var _this = this;
        var accessKeyDisplay = null;
        var accessKeyRadioButton = null;
        var dashboardHeading = null;
        var headingRow = null;
        var rowsOfOrders = null;
        var newOrderLink = null;
        var timeSlots = this.state.availableTimeSlots;

        var newOrderButton = null;
        var flebies = null;
        var exportButton = null;
        if(this.state.flebies != null && this.state.flebies.length > 0) {
            flebies = this.state.flebies;
        }    
        
        if( this.state.loaded == true && this.state.orders != null )
        {

            if(this.state.user != null && this.state.user.role == "ADMIN" && this.state.orders!= null && this.state.orders.length > 0)
            {
                
                
                rowsOfOrders = this.state.orders.map(function(order,index){
                    var cashToBeCollected = 0;
                    var changeStatusAction = null;
                    var status = null;
                    if((_this.state.orderStatusMap != null) && (_this.state.orderStatusMap[order.orderId] == null))
                    {
                        status = order.status;
                    }
                    else
                    {
                        status = _this.state.orderStatusMap[order.orderId];
                    }
                        
                    if(status == 'UNASSIGNED')
                    {
                        changeStatusAction  = <button className='btn btn-info' onClick=''>ASSIGN</button>;
                    }
                    else if(status == 'ASSIGNED')
                    {
                        changeStatusAction  = <button className='btn btn-info' value={order.orderId} onClick={_this.changeStatusOfOrder.bind(_this)}>COLLECTED</button>;
                    }
                    else if (status == 'COLLECTED')
                    {
                        changeStatusAction  = <button className='btn btn-info' value={order.orderId} onClick={_this.changeStatusOfOrder.bind(_this)}>SUBMITTED</button>;
                    }
                    else if (status == 'SUBMITTED') {
                        changeStatusAction  = <button className='btn btn-info' value={order.orderId} onClick={_this.changeStatusOfOrder.bind(_this)}>COMPLETED</button>;
                    }
                    else if(status == 'CANCELLED')
                    {
                        changeStatusAction  = <button className='btn btn-info' >----</button>;
                    }
                    else if (status == 'COMPLETED') {
                        changeStatusAction = <button className='btn btn-info' >----</button>;
                    }
                    if(order.paymentType == "COD")
                    {
                        cashToBeCollected = order.grossTotal;
                    }

                    var assignedFlebie = order.assignedTo;
                    

                    var flebieOptions = null;

                    if(_this.state.flebies != null && _this.state.flebies.length > 0) {
                        flebieOptions = flebies.map(function(flebie,index){
                            if(order.assignedTo == flebie.userId)
                            {
                                return <option selected="selected" value={order.orderId+":"+flebie.userId}>{flebie.userDetails.firstName}</option>;
                            }
                            else {
                                return <option value={order.orderId+":"+flebie.userId}>{flebie.userDetails.firstName}</option>;
                            }

                        });
                        flebieOptions.unshift(<option value="">Select a flebie</option>);
                        var selectText = <select onChange={_this.assignFlebieToOrder.bind(_this)}>{flebieOptions}</select>;
                    }

                    if(status != 'PENDING')
                    {
                        return  <tr><td><a className="btn btn-info" href={"/editOrder?id="+order.orderId}>{order.orderDetails.firstName}</a></td><td>{changeStatusAction}</td><td className="address-col">{order.orderDetails.address}</td><td>{order.orderDetails.phoneNumber}</td><td>{status}</td><td>{order.scheduleDate+" "+order.scheduleTime}</td><td>{order.orderDetails.emailId}</td><td>{selectText}</td><td>{cashToBeCollected}</td><td>{order.labName}</td></tr>;
                    }
                     
                    
                });
            }
            else if(this.state.user != null && this.state.user.role == "LABADMIN" && this.state.orders!= null && this.state.orders.length > 0)
            {
                rowsOfOrders = this.state.orders.map(function(order,index){
                    if(order.status != 'PENDING')
                    {
                        return  <tr><td><a className="btn btn-info" href={"/editOrder?id="+order.orderId}>{order.orderDetails.firstName}</a></td><td  className="address-col">{order.orderDetails.address}</td><td>{order.orderDetails.phoneNumber}</td><td>{order.status}</td><td>{order.scheduleDate+" "+order.scheduleTime}</td><td>{order.orderDetails.emailId}</td></tr>;
                    }
                    
                    
                }); 
            }
            else if(this.state.user != null && this.state.user.role == "FLEBIE" && this.state.orders!= null && this.state.orders.length > 0)
            {
                //var _this = this;
                rowsOfOrders = this.state.orders.map(function(order,index){
                    var cashToBeCollected = 0;
                    var changeStatusAction = null;
                    var status = null;
                    if((_this.state.orderStatusMap != null) && (_this.state.orderStatusMap[order.orderId] == null))
                    {
                        status = order.status;
                    }
                    else
                    {
                        status = _this.state.orderStatusMap[order.orderId];
                    }

                    if(status == 'ASSIGNED')
                    {
                        changeStatusAction  = <button className='btn btn-info' value={order.orderId} onClick={_this.changeStatusOfOrder.bind(_this)}>COLLECTED</button>;
                    }
                    else if (status == 'COLLECTED')
                    {
                        changeStatusAction  = <button className='btn btn-info' value={order.orderId} onClick={_this.changeStatusOfOrder.bind(_this)}>SUBMITTED</button>;
                    }
                    else if (status == 'SUBMITTED') {
                        changeStatusAction  = <button className='btn btn-info' >----</button>;
                    }
                    else if(status == 'CANCELLED')
                    {
                        changeStatusAction  = <button className='btn btn-info' >----</button>;
                    }
                    else if (status == 'COMPLETED') {
                        changeStatusAction = <button className='btn btn-info' >----</button>;
                    }
                    
                    
                    
                    
                    if(order.paymentType == "COD")
                    {
                        cashToBeCollected = order.grossTotal;
                    }

                    if(order.assignedTo ==  _this.state.user.userId)
                    {
                        if(status != 'PENDING')
                        {
                            if(_this.state.user != null && _this.state.user.role =="FLEBIE"){
                                    return  <tr><td><a className="btn btn-info" href={"/editOrder?id="+order.orderId}>{order.orderDetails.firstName}</a></td>
                                    <td>{changeStatusAction}</td>
                                    <td>{status}</td>
                                    <td>{order.labName}</td>
                                    <td className="address-col">{order.orderDetails.address}</td>
                                    <td>{order.orderDetails.phoneNumber}</td>
                                    <td>{order.scheduleDate+" "+order.scheduleTime}</td>
                                    <td>{order.orderDetails.emailId}</td>
                                    <td>{cashToBeCollected}</td>x</tr>;

                            }else{
                                return  <tr><td><a className="btn btn-info" href={"/editOrder?id="+order.orderId}>{order.orderDetails.firstName}</a></td><td>{changeStatusAction}</td><td>{order.orderDetails.address}</td><td>{order.orderDetails.phoneNumber}</td><td>{status}</td><td>{order.scheduleDate+" "+order.scheduleTime}</td><td>{order.orderDetails.emailId}</td><td>{cashToBeCollected}</td><td>{order.labName}</td></tr>;

                            }
                        }
                        
                        
                    }



                    
                });
            }
            

        }
        if(this.state.user != null && this.state.user.role == "LABADMIN")
        {
            dashboardHeading = <h1 style={{textAlign: "center"}}>LAB ADMIN DASHBOARD</h1>;
            newOrderButton = <a className="btn btn-info"  href={`/test/list?labId=${this.state.user.labId}`} id="createANewOrder" style={{backgroundColor:"#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}> New Order</a>;
        }else if(this.state.user != null && this.state.user.role == "ADMIN")
        {
            dashboardHeading = <h1 style={{textAlign: "center"}}>ADMIN DASHBOARD</h1>;
            newOrderButton = <a className="btn btn-info"  href={`/`} id="createANewOrder" style={{backgroundColor:"#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}> New Order</a>;
        }
        else if(this.state.user != null && this.state.user.role == "FLEBIE")
        {
            
            dashboardHeading = <h1 style={{textAlign: "center"}}>FLEBIE DASHBOARD</h1>;
            newOrderButton = <a className="btn btn-info"  href={`/`} id="createANewOrder" style={{backgroundColor:"#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}> New Order</a>;
        }
        
        if(this.state.user != null && this.state.user.role =="ADMIN")
        {
            accessKeyDisplay = <input disabled={_this.state.accessKeyTruthValue} id="accessKeyDisplay" value={_this.state.accessKey}/>;
            accessKeyRadioButton = <input type="radio"  onClick={_this.changeAccessKeyTruthValue.bind(_this)} id="accessKeyRadioButton" />;

            headingRow = <tr>
                <th> NAME</th>
                <th>CHANGE STATUS</th>  
                <th> ADDRESS</th>              
                <th> PHONE</th>
                <th> STATUS</th>
                <th> DATE/TIME</th>
                <th> EMAIL</th>
                <th>ASSIGNED</th>
                <th>CASH</th>
                <th>LAB NAME</th>
                
            </tr>;
            exportButton = <button  className="btn btn-info" id="getCSVData" onClick={this.getOrdersAsCSVForADMIN.bind(this)} style={{ backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", textAlign: "right"}}>
                <span className="glyphicon glyphicon-download-alt">Export</span>
            </button>;
            
        }
        else if(this.state.user != null && this.state.user.role =="LABADMIN")
        {
            headingRow = <tr>
                <th> NAME</th>
                <th> ADDRESS</th>
                <th> PHONE</th>
                <th> STATUS</th>
                <th> DATE/TIME</th>
                <th> EMAIL</th>
                </tr>;
            exportButton = <button  className="btn btn-info" id="getCSVData" onClick={this.getOrdersAsCSVForLABADMIN.bind(this)} style={{ backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", textAlign: "right"}}>
                <span className="glyphicon glyphicon-download-alt">Export</span>
            </button>;
        }
        else if(this.state.user != null && this.state.user.role =="FLEBIE")
        {
            headingRow = <tr>
                <th> NAME</th>
                <th>CHANGE STATUS</th>
                
                <th> STATUS</th>
                <th> LABNAME</th>
                <th> ADDRESS</th>
                
                <th> PHONE</th>
                
                <th> DATE/TIME</th>
                <th> EMAIL</th>
                <th> CASH</th>
                
                
            </tr>;
            exportButton = <button  className="btn btn-info" id="getCSVData" onClick={this.getOrdersAsCSVForFLEBIE.bind(this)} style={{ backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", textAlign: "right"}}>
                <span className="glyphicon glyphicon-download-alt">Export</span>
            </button>;
        }
        
        return (
            
            <div className="dashboard-main">
                {dashboardHeading}
                {accessKeyRadioButton}
                {accessKeyDisplay}
                <div className="container-fluid dashboard-content" style={{backgroundColor: "rgba(255,255,255,0.60)"}} >
                    <div className="clearfix critical-content">
                        <div className="row">
                        <div className="col-xs-6">
                            <select id="statusFilter" className="status-filter" onChange={this.getOrdersOfGivenStatus.bind(this)} style={{backgroundColor:"#00CF17", color:"black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}>
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
                            {newOrderButton}                    
                        </div>
                        
                    </div>
                    <div className="row check-availability">
                        <div className="col-xs-12 col-md-4 ">
                            <label> CHECK AVAILABILITY</label>
                        </div>
                        <div className="col-xs-4 col-md-3">
                            <DatePicker id="slotDate" selected={this.state.slotDate} onChange={this.handleSlotDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>
                        </div>
                        <div className="col-xs-8 col-md-5">
                            <textarea id="availableTimeSlots" value={this.state.availableTimeSlots}>{this.state.availableTimeSlots}</textarea>
                        </div>
                    </div>    
                    <div className="row btn-container">
                            <div className="col-lg-10">
                            </div>
                            <div className="col-lg-2">
                                <button id="refreshButton"  onClick={this.getOrdersForCurrentDates.bind(this)} className="btn btn-info" style={{backgroundColor: "#00CF17", color:"black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", float: "right"}}>
                                    <span className="glyphicon glyphicon-refresh">  Refresh </span>
                                </button>
                            </div> 
                    </div>
                    <div className="row">
                        <div className="col-xs-6 form-inline">
                            <label htmlFor="exampleInputName2">From</label>
                            <DatePicker id="fromDate" selected={this.state.startDate} onChange={this.handleStartDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>

                        </div>
                        
                        <div className="col-xs-6 form-inline to-block">
                            <label htmlFor="exampleInputName21">To</label>
                            <DatePicker id="toDate" selected={this.state.endDate} onChange={this.handleEndDateChange.bind(this)}  dateFormat="YYYY-MM-DD"/>
                        </div>   
                    </div> 


                    </div>
                    
                    
                    <div id="products" className="row list-group table-wrap">
                        <table className="table  table-responsive" id="datatable">
                            <thead className="thead-inverse" width="100%">
                            {headingRow}
                            </thead>
                            <tbody id="bodyoftable">
                                {rowsOfOrders}
                            </tbody>

                        </table>
                        
                    <br/>
                    <br/>
                    </div>
                    <div className="row">
                        {exportButton}
                    </div>    
                </div>

            </div>
            
        );
    }
}
export default Dashboard;
