import React from 'react';
import reqwest from 'reqwest';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import  OpenCartModalContent from './modules/editCart.jsx';
import Modal from './utils/modal.jsx';
//var najax =  require('najax');

class CheckOut extends React.Component {
    constructor(props){
		super(props);
        this.state={
            activetab:"patientDetailsBlock",
            patientDetailsInfo:[],
            enableScheduling:false,
            enablePayment:false,
            patientData:{},
            editableCart:true,
            focused:false,
            timeSlotArray:[],
            isOffer:"",
            offer:"",
            slotDate: moment(),
            slotTime: null,
            paymentType:"COD",
            timeStringArray : null
        }
    }
    componentDidMount(){
        console.log("popular");
        var patientForm= [
            {
                name:"firstName",
                id:1,
                errMsg:"Please Enter Valid Name",
                required:true,
                waterMark:"Name",
                type:"text",
                iconCSS:"icon icon-user",
                reg:/^[a-zA-Z ]+$/,
                css:"clearfix"
            },
            {
                name:"emailId",
                id:2,
                errMsg:"Please Enter Email Id",
                required:true,
                waterMark:"Email",
                type:"email",
                iconCSS:"icon icon-email",
                reg:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                css:"clearfix"
            },
            {
                name:"phoneNumber",
                id:3,
                errMsg:"Please Enter Phone number",
                required:true,
                waterMark:"Phone",
                type:"tel",
                iconCSS:"icon icon-mob",
                reg:/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
                css:"clearfix"
            },
            {
                name:"age",
                id:4,
                errMsg:"Please Enter Age",
                required:false,
                waterMark:"Age",
                type:"number",
                iconCSS:"icon icon-age",
                css:"fl w50 age-block"
            }
        ];
        this.getAvailableSlots.bind(this)(this.state.slotDate);
        var localCart = localStorage.getItem("cartInfo");
        if(!localCart){
            alert("Cart is empty")
            return false;
        }else{
            Fleb.localCart=JSON.parse(localCart);
        }
        this.setState({
            patientDetailsInfo:patientForm
        })
        Fleb.applyOfferResp={
            orderLevelDiscount:0
        }
	}
    openSection(e){
        var target = e.target.getAttribute("data-target");
        this.setState({
            activetab:target
        })
    }
    getAvailableSlots(date) {
        Fleb.showLoader();
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
                Fleb.hideLoader();
                console.log("Resp is: "+JSON.stringify(resp));
                var timeSlots = null;
                var timeSlotStringArray = [];
                if(resp.timeSlots.length != 0)
                {
                    timeSlots = resp.timeSlots;

                    for(var i in timeSlots)
                    {
                        timeSlotStringArray.push(timeSlots[i]+"-"+moment("1900-01-01 "+timeSlots[i], "YYYY-MM-DD hh:mm a").add(30, "minutes").format("hh:mm a").toUpperCase());
                    }
                    
                    _this.setState({
                        timeStringArray: timeSlotStringArray,
                        slotTime: timeSlots[0].split("-")[0]
                    });

                }
                console.log("Timeslots are: "+timeSlots);



            }
        })
    }
    getPatientInfo(e){
        var elem= this.refs.patientDetailsBlock;
        var inputArray= elem.querySelectorAll(".form-control");
        var patientData={};
        var isError=true;
        for(var i =0;i<inputArray.length;i++){
            var input = inputArray[i];
            var type = input.getAttribute("type");
            var name= input.getAttribute("name");
            var val = input.value;
            var id=input.getAttribute("data-id")
            var errElem = this.refs["errInput"+id];
            if(val){
                var reg = this.state.patientDetailsInfo[id-1].reg;
                if(reg){
                    if(reg.test(val)){
                        errElem.className="err-msg fade-out";
                        patientData[name]= val;
                    }else{
                        errElem.className="err-msg "  ;
                        patientData[name]= ""; 
                        isError=false;                     
                    }
                }else{
                    if(name === "age"){
                        if( val >=0 && val <= 150 ) {
                             errElem.className="err-msg fade-out"
                             patientData[name]= val;
                        }else{
                             errElem.className="err-msg";
                             errElem.innerHTML="Please Enter Age";
                             patientData[name]= "";
                             isError=false;
                        }
                        if(val <=5){
                            errElem.className="err-msg";
                            errElem.innerHTML="Age must be greater than 5 years";
                             patientData[name]= "";
                             isError=false;
                        }
                    }
                }
            }else{
                errElem.className="err-msg";
                patientData[name]= "";
                isError=false;
            }
        }
        var genderList = this.refs.genderBlock.querySelectorAll(".radio-ctrl");
        var isGender=false;
        for(var i=0;i<genderList.length;i++){
            var radio = genderList[i];
            if(radio.checked){
                isGender=radio.value;                
            }
        }
        if(isGender== false){
            this.refs.errInputGen.className="err-msg";
            isError=false;
        }else{
            patientData["gender"]= isGender;
            this.refs.errInputGen.className="err-msg fade-out";            
        }
        if(isError){
            this.setState({
                enableScheduling:true,
                patientData:patientData,
                activetab:"SchedulingBlock"
            })

        }
    }
    
    dateChanged(date){
        var _this = this;
        
        var slotDate = moment(date,"DD/MM/YYYY");
        console.log("Value is: "+slotDate);

        this.setState({
            slotDate:slotDate
        });
        this.getAvailableSlots.bind(this)(slotDate)
    }
    updateOrder(type){
        var payLoad = Fleb.orderResp;
        payLoad.paymentMode =type;

        reqwest({
            url: '/updateTransaction'
            , type: 'json'
            ,data:JSON.stringify(payLoad)
            , contentType: 'application/json'
            , method: 'put'
            , error: function (err) { 
                alert("Not able to make payment");
                Fleb.hideLoader();
            }
            , success: function (resp) {
                location.href="paymentresponse?id="+Fleb.orderResp.orderId
            }   
            });

        //updateTransaction
    }
    getSchedulingInfo(){
        var _this = this;
        var orderComments = this.refs.commentBox.value;
        var data = localStorage.getItem("cartInfo");
        var orderItems = [];
        if(data){
            data = JSON.parse(data);
            orderItems=data.orderItems.map(function(item,index){
                return{
                    labTestId: item.labTestId,
                    quantity: item.quantity
                }
            })
        }else{
            alert("Invalid Order");
            location.href="";
        }
        Fleb.showLoader();
        var userDetails = this.state.patientData;
        userDetails["address"] = this.refs.addressInfo.value;
        var payLoad = {
            "consumerId": 1,
            "convenienceFee": 0,
            "grossMRP": data.totalListPrice,
            "grossTotal": 0,
            "orderComments": orderComments,
            "orderLevelDiscount": data.totalListPrice-data.totalPrice,
            "orderOriginPerson": 1,
            "orderTotal": data.totalPrice,
            "paymentType": "CARD",
            "scheduleDate": this.state.slotDate,
            "scheduleTime": this.state.slotTime.split("-")[0],
            "status": "PENDING",
            "orderDetails":userDetails,
            "orderItems": orderItems
            };
        Fleb.payLoadOrder = payLoad;
            reqwest({
                url: '/createOrder'
            , type: 'json'
            ,data:JSON.stringify(payLoad)
            , contentType: 'application/json'
            , method: 'post'
            , error: function (err) { 
                
                
                alert("Not able to create order. Please try again later or try different Time slot");


                //hard coded ordered resp
               /* Fleb.eventDispatcher("convenienceFee",{convenienceFee:100});
               var pResp= {
                    "amount": 704,
                    "createdAt": "2017-01-29T12:44:24.255Z",
                    "emailId": "adarsha.shetty.1989@gmail.com",
                    "orderId": 182,
                    "signature": "051ce42acb75178beb2eb9cb1e723e070f7b4bbf",
                    "transactionId": 67,
                    "txId": "a98df027-f055-4b9f-b167-a9634da35b7f",
                    "updatedAt": "2017-01-29T12:44:24.255Z"
                };
                Fleb.orderResp= pResp;
                if(Fleb.orderResp.orderId){
                    _this.setState({
                        enablePayment:true,
                        activetab:"paymentBlock",
                        editableCart:false
                    },function(){

                        var cartBtn = document.getElementById("cartPl");
                        cartBtn.classList.add("hide");
                    })
                }*/
                // hard code templte 

                Fleb.hideLoader();
            }
            , success: function (resp) {
                Fleb.orderResp = resp;
                Fleb.hideLoader();
                Fleb.eventDispatcher("convenienceFee",{convenienceFee:(resp.convenienceFee)?resp.convenienceFee:0});
                if(Fleb.orderResp.orderId){
                    _this.setState({
                        enablePayment:true,
                        activetab:"paymentBlock",
                        editableCart:false
                    },function(){

                        var cartBtn = document.getElementById("cartPl");
                        cartBtn.classList.add("hide");
                    })
                }else{

                    alert("Not able to create order with this date. Please choose different date or time");
                   return false;
                }
                }
            }) 


       
    }
    setTimeSlot(e){
        var _this = this;
        var value = e.target.value;
        console.log("value is: "+value);
        _this.setState({
          slotTime: value   
        });
        Fleb.selectedTime = value;
        var payLoad = {        
            "slotDate": this.state.slotDate,
            "slotTime":this.state.slotTime.split("-")[0]
        };
        Fleb.slotResp= payLoad;
       /* Fleb.showLoader();
         reqwest({
                url: '/setTimeSlot'
            , type: 'json'
            ,data:JSON.stringify(payLoad)
            , contentType: 'application/json'
            , method: 'post'
            , error: function (err) { 
                Fleb.hideLoader();
                alert("please select another time");
            }
            , success: function (resp) {
                Fleb.slotResp = resp;
                Fleb.hideLoader();
                }
            })*/

    }
    applyOffer(e){
        var _this=this;
        var val = this.refs.offerInput.value;
        var code = val.toUpperCase();
        var orderId = Fleb.orderResp.orderId;
             Fleb.showLoader();
            var promoCode='promoCode='+code+'&orderId='+orderId;

            reqwest({			
				url:"/applyOffer?"+promoCode
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
                    _this.setState({
                            isOffer:false,
                            offer:""
						})  
                        alert("Please try again later");
                        Fleb.hideLoader();
				}
				, success: function (resp) {
                    if(resp.orderLevelDiscount){
                        Fleb.applyOfferResp = resp;
                        var respData = {
                            orderLevelDiscount:(resp.orderLevelDiscount)?resp.orderLevelDiscount:0
                        }
                        Fleb.eventDispatcher("offerApplied",respData);
                        _this.setState({
                            isOffer:true,
                            offer:val
                        })    
                    }else{
                        _this.setState({
                            isOffer:false,
                            offer:""
                        }) 
                    }

                    Fleb.hideLoader();
				}
		})
    }
    removeOffer(e){
        var orderId="";
Fleb.showLoader();
        var _this=this;
        var orderId=Fleb.orderResp.orderId;
        var promoCode='&orderId='+orderId;
            reqwest({			
				url:"/removeOffer?"+promoCode
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
                    alert("Please try again later");
                        Fleb.hideLoader();
				}
				, success: function (resp) {
                     Fleb.applyOfferResp = resp;
                     Fleb.eventDispatcher("offerApplied",{orderLevelDiscount:0});
						_this.setState({
                            isOffer:false,
                            offer:""
						}) 
                        Fleb.hideLoader();
				}
		})

    }
    makePayment(){
        //paymentOpt
        if(!Fleb.orderResp){
            alert("Please try another Lab or Date");
            return false;
        }

        var paymentMethod = document.querySelector(".payment-main").querySelectorAll(".paymentOpt");
        var payMethod="";
        for(var i=0;i<paymentMethod.length;i++){
            var radio = paymentMethod[i];
            if(radio.checked){
                  payMethod= radio.value;             
            }
        }

        Fleb.showLoader();
        if(payMethod ==="COD" ||  payMethod=="PO" ){
            this.updateOrder.bind(this)(payMethod);
            return false;
        }

        var paymentResp = {
            email:this.state.patientData.email,
            merchantTxnId:Fleb.orderResp.txId,
            orderAmount:Fleb.orderResp.amount-Fleb.applyOfferResp.orderLevelDiscount,
            currency:"INR",
            secSignature:Fleb.orderResp.signature,
            returnUrl:"https://www.flebie.com/paymentresponse?id="+Fleb.orderResp.orderId
        }
        var form = document.createElement("form");
        form.setAttribute("method","post");
        form.setAttribute("id","paymentForm");
        form.setAttribute("enctype","application/x-www-form-urlencoded");
        form.setAttribute("action","https://www.citruspay.com/flebie");
        var frg = document.createDocumentFragment();
        for (var key in paymentResp) {
            var input = document.createElement("input");
            input.setAttribute("value",paymentResp[key]);
            input.setAttribute("name",key);
            input.setAttribute("type","hidden");
            frg.appendChild(input);
        }
        form.appendChild(frg);
        // html: '<div ...>\n<h1 ...>Constructing HTML Elements<h1>\n</div>'
        this.refs.fakeForm.appendChild(form);
        var paymentForm = document.getElementById("paymentForm");
        paymentForm.submit();
    }
    changeWalkIn(e){
        var checked= e.target.value;
        if(checked ==="WalkIn"){
            this.state.orderType=="WalkIn"
            this.setState({
                orderType:checked
            })
        }else{
            this.setState({
                orderType:""
            })
        }
    }
    selectedPayType(e){
        var checked = e.target.value;
        console.log(checked);
        this.setState({
            paymentType:checked
        })
    }
    render(){
        var tabContentUI =[];
        var patientDetailsForm=[];
        patientDetailsForm = this.state.patientDetailsInfo.map(function(item,index){
            return <div className={"form-row "+ item.css}>
                <div className="input-row input-group">
                    <span className={item.iconCSS+" input-group-addon"}/>
                    <input type={item.type} 
                        id={"PatientCtrl"+item.id}
                        data-required={item.required}
                        className="form-control"
                        name={item.name}
                        data-id={item.id}
                        placeholder={item.waterMark}/>
                </div>
                <span className={(item.required)?"required":"hide"}>*</span>
                <div ref={"errInput"+item.id} className="err-msg fade-out">{item.errMsg}</div>
            </div>
        })
        var patientdetailsUI=<div id="patientDetailsBlock" ref="patientDetailsBlock" className={(this.state.activetab=="patientDetailsBlock")?"tab-main fade-in":"fade-out"}>
            <h3>Patient Details</h3>
            <div className="form-content">
            {patientDetailsForm}
            <div ref="genderBlock" className="form-row gen-block input-row">
                <label className="radio-inline">
                    <input type="radio" name="gender" className="radio-ctrl" id="male" value="male"/> Male
                </label>
                <label className="radio-inline">
                    <input type="radio" name="gender" className="radio-ctrl" id="female" value="female"/> Female
                </label>
            <div ref="errInputGen" className="err-msg fade-out">Please select gender</div>
                
            </div>
            <div className="clearfix tab-ft">
            <button id="getPatientInfo" className="btn btn-success fr btn-next curved" onClick={this.getPatientInfo.bind(this)}>Next</button>
            </div>
            </div>
        </div>
        var timeSlotArrayUI = [];
        if((this.state.timeStringArray != null) && (this.state.timeStringArray.length > 0)){
            timeSlotArrayUI = this.state.timeStringArray.map(function(timeSlot,index){
                
                    return <option value={timeSlot}>{timeSlot}</option>
                
            })
                
            }
            var labAddress="";
            if(this.state.orderType=="WalkIn"){
                labAddress= Fleb.localCart.labAddress;
            }else{
                labAddress=""
            }

         var schedulingUI = <div id="SchedulingBlock" className={(this.state.activetab==="SchedulingBlock")?"tab-main fade-in":"fade-out"}>
                <p className={(this.state.orderType=="HomeCol")?"":"hide"}>Convenience fee of INR 100 will be levied on home collection orders</p>
                <div className="clearfix hide">
                    <label className="radio-inline first-radio">
                        <input type="radio" name="ordertype" defaultChecked onChange={this.changeWalkIn.bind(this)} id="ordertype1" value="HomeCol"/> Home Collection
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="ordertype" id="ordertype2" onChange={this.changeWalkIn.bind(this)} value="WalkIn"/> Walk-in Appointment
                    </label>
                </div>
                <h4 className="sel-head">Select Date and Timeslot</h4>
                <div className="col2-row m20">
                    <SingleDatePicker
                            id="slotDate"
                            date={this.state.slotDate}
                            focused={this.state.focused}
                            onDateChange={this.dateChanged.bind(this)}
                            onFocusChange={({ focused }) => { this.setState({ focused }); }}
                            numberOfMonths={1}
                            displayFormat="DD/MM/YYYY"
                            />  
                    <div className="time-selector-main">
                        <select className="form-control" onChange={this.setTimeSlot.bind(this)}>
                            {timeSlotArrayUI}
                        </select>
                    </div>
                </div>
                    <div className="form-row m20">
                        <label className="control-label ">Address</label>
                        <input type="textarea" 
                            id="address"
                            className="form-control"
                            defaultValue={labAddress}
                            ref="addressInfo"
                            placeholder="Enter Adrress"/>
                            
                        <span className={"hide"}>*</span>
                        <div ref={"errInput"} className="err-msg fade-out">"Please Enter Addres"</div>
                    </div>
                    <div className="form-row m20">
                        <label className="control-label ">Comments</label>
                        <input type="textarea" 
                            id="comments"
                            ref="commentBox"
                            defaultValue={labAddress}
                            className="form-control"/>

                        <span className={"hide"}>*</span>
                    </div>
                    <div className="clearfix">
                    <button id="getSchdulingInfo" className="btn btn-success fr btn-next curved" onClick={this.getSchedulingInfo.bind(this)}>Next</button>
                    </div>
        </div>;
        var alternatePayments=[];
        if(this.props.data.userPtype<3){
            alternatePayments = <div className="radio">
                    <label>
                        <input type="radio" name="optionsRadios" className="paymentOpt" onChange={this.selectedPayType.bind(this)}  id="optionsRadios2" value="online"/>
                        Credit Card/Debit Card/Net Banking
                    </label>
                </div>
        }
        if(this.props.data.userPtype == 3){
            alternatePayments = <div className="radio">
                    <label>
                        <input type="radio" name="optionsRadios" className="paymentOpt" onChange={this.selectedPayType.bind(this)}  id="optionsRadios2" value="PO"/>
                        Paid Online
                    </label>
                </div>
        }
        var btnText ="";
        if(this.state.paymentType=="COD" || this.state.paymentType=="PO"){
            btnText="Confirm Order"
        }
         if(this.state.paymentType=="online"){
            btnText="Proceed to Pay"
        }
        var paymentUI = <div id="paymentBlock" className={(this.state.activetab==="paymentBlock")?"tab-main fade-in":"fade-out"}>
            <h3>Payment</h3>
            <div className="clearfix payment-main">
                <div className="radio">
                    <label>
                        <input type="radio" name="optionsRadios" className="paymentOpt" id="optionsRadios1" onChange={this.selectedPayType.bind(this)} value="COD" defaultChecked/>
                        Cash On Delivery
                    </label>
                </div>
                {alternatePayments}
            </div>
            <div className={(this.props.data.userPtype == 3)?"hide":"offer-main"}>
                <div className="input-group">
                    <input type="text" defaultValue={this.state.offer} className="form-control" ref="offerInput" id="exampleInputAmount" placeholder="Enter Promo Code"/>
                    <div className="input-group-addon">
                        <button onClick={this.applyOffer.bind(this)} className={(!this.state.isOffer)?"btn btn-default":"hide"}>Apply</button>
                        <button onClick={this.removeOffer.bind(this)} className={(this.state.isOffer)?"btn btn-default":"hide"}>remove</button>
                    </div>

                </div>
            </div>
                <div className={(this.state.isOffer=== true)?"offer-msg success":"hide"}>
                        <p><span className="icon icon-thumbs-up"></span> Promo Code has been applied successfully</p>
                    </div>

                    <div className={(this.state.isOffer=== false)?"offer-msg failed":"hide"}>
                        <p><span className="icon icon-thumb-down"></span> Promo Code has not been applied</p>
                    </div>
            <div  className="text-center make-payment clearfix">
                    <button id="MakePayment" className="btn btn-success fr btn-next curved" onClick={this.makePayment.bind(this)}>{btnText}</button>                
            </div>
        </div>

        tabContentUI.push(patientdetailsUI,schedulingUI,paymentUI);
        return (
            <div className="checkout-main">
                <div className="checkout-banner">
                    <h1>Checkout</h1>
                    <p>We are glad you found what you were looking for. We need a few details from you before proceeding with your order. We promise you not to spam your inbox or pester you with unnecessary calls. Your online transactions are also secure. So, go ahead, confirm your order.</p>
                    
                </div>
                <div className="checkout-content col2-row">
                    <div className="order-block">
                        <h3>Order Details</h3>
                        <div className="tab-head-row col3-row">
                            <button onClick={this.openSection.bind(this)} data-target="patientDetailsBlock" className={(this.state.activetab=== "patientDetailsBlock")?"btn btn-link active-tab":"btn btn-link"}>Patient details</button>
                            <button onClick={this.openSection.bind(this)} disabled={(this.state.enableScheduling?"":"disabled")} data-target="SchedulingBlock" className={(this.state.activetab==="SchedulingBlock")?"btn btn-link active-tab":"btn btn-link"}>Scheduling</button>
                            <button onClick={this.openSection.bind(this)} disabled={(this.state.enablePayment?"":"disabled")} data-target="paymentBlock" className={(this.state.activetab==="paymentBlock")?"btn btn-link active-tab":"btn btn-link"}>Payment</button>                            
                        </div>
                        <div className="tab-content">
                            {tabContentUI}
                        </div>

                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="order-block">
                            <OpenCartModalContent  triggerElem={false}  isEditable={this.state.editableCart} header={true}/>
                        </div>
                    </div>



                </div>
                <div ref="fakeForm" id="fakeFormPlace"/>
        </div>
        );
    }
}
export default CheckOut;