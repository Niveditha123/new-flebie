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
            date: moment(),
            focused:false,
            timeSlotArray:[],
            isOffer:false,
            offer:"",
            timeStringArray : ["Select Time", "7:00:00 AM-7:30:00 AM", "7:30:00 AM-8:00:00 AM", "8:00:00 AM-8:30:00 AM","8:30:00 AM-9:00:00 AM","9:00:00 AM-9:30:00 AM", "9:30:00 AM-10:00:00 AM", "10:00:00 AM-10:30:00 AM","10:30:00 AM-11:00:00 AM","11:00:00 AM-11:30:00 AM","11:30:00 AM-12:00:00 PM","12:00:00 PM-12:30:00 PM","12:30:00 PM-1:00:00 PM","1:00:00 PM-1:30:00 PM","1:30:00 PM-2:00:00 PM","2:00:00 PM-2:30:00 PM","2:30:00 PM-3:00:00 PM","3:00:00 PM-3:30:00 PM","3:30:00 PM-4:00:00 PM","4:00:00 PM-4:30:00 PM","4:30:00 PM-5:00:00 PM"]
        }
    }
    componentDidMount(){
        console.log("popular");
        var patientForm= [
            {
                name:"firstname",
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
                name:"email",
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
                name:"phone",
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
        this.setState({
            patientDetailsInfo:patientForm
        })
	}
    openSection(e){
        var target = e.target.getAttribute("data-target");
        this.setState({
            activetab:target
        })
    }
    getPatientInfo(e){
        var elem= this.refs.patientDetailsBlock;
        var inputArray= elem.querySelectorAll(".form-control");
        var patientData={};
        var isError=true;
        debugger;
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
    getTimeSlots(d){
        var _this = this;
        var date = moment(d).format('YYYY-MM-DD');
        var today = new Date();
            var currentTime = today.getHours();
            if((moment(d).format('MM/DD/YYYY') == moment().format('MM/DD/YYYY')) &&  (currentTime >=14 )){
             _this.setState({
                timeSlotArray:[],
                date:d
			})  
             return false;
         }
        Fleb.showLoader();
        reqwest({			
				url:"/getAvailableSlots?slotDate="+date
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
                    _this.setState({
                            timeSlotArray:[],
                            date:d
						})  
                        Fleb.hideLoader();
				}
				, success: function (resp) {
                    debugger;
					 var slotArray = _this.state.timeStringArray.slice();
                     Fleb.getSlotResp = resp;
						_this.setState({
                            timeSlotArray:slotArray,
                            date:d
						})
                        Fleb.hideLoader();
				}
		})
    }
    dateChanged(date){
        this.getTimeSlots.bind(this)(date)
    }
    getSchedulingInfo(){
        var _this = this;
        debugger;
        var orderComments = this.refs.commentBox.value;
        var data = localStorage.getItem("cartInfo");
        var orderItems = [];
        if(data){
            data = JSON.parse(data);
            orderItems=data.items.map(function(item,index){
                return{
                    labTestId:item.labtestid,
                    quantity:item.quantity
                }
            })
        }else{
            alert("Invalid Order");
            location.href="";
        }
        if(!Fleb.slotResp){
            alert("Plaese choose a time!");
            return false;
        }
        Fleb.showLoader();
        
        var payLoad = {
            "consumerId": 1,
            "convenienceFee": 12,
            "grossMRP": data.totalListPrice,
            "grossTotal": 0,
            "orderComments": orderComments,
            "orderLevelDiscount": data.totalListPrice-data.totalPrice,
            "orderOriginPerson": 1,
            "orderTotal": data.totalPrice,
            "paymentType": "CARD",
            "promotionId": 1,
            "scheduleDate": Fleb.slotResp.slotDate,
            "scheduleTime": Fleb.slotResp.slotTime,
            "status": "PENDING",
            "orderDetails":this.state.patientData,
                "orderItems": orderItems
            }
            debugger;
            reqwest({
                url: '/createOrder'
            , type: 'json'
            ,data:JSON.stringify(payLoad)
            , contentType: 'application/json'
            , method: 'post'
            , error: function (err) { 
                 _this.setState({
                    enablePayment:true,
                    activetab:"paymentBlock",
                    editableCart:false
                },function(){
                    var cartBtn = document.getElementById("cartPl");
                    cartBtn.classList.add("hide");
                    Fleb.hideLoader();
                })
            }
            , success: function (resp) {
                debugger;
                Fleb.orderResp = resp;
                _this.setState({
                    enablePayment:true,
                    activetab:"paymentBlock",
                    editableCart:false
                },function(){
                    Fleb.hideLoader();
                    var cartBtn = document.getElementById("cartPl");
                    cartBtn.classList.add("hide");
                })
                }
            }) 


       
    }
    setTimeSlot(e){
        debugger;
        var value = e.target.value;
        Fleb.selectedTime = value;
        var payLoad = {        
            "slotDate": moment(this.state.date).format(),
            "slotTime":Fleb.selectedTime.split("-")[0]
        };
        Fleb.showLoader();
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
            })

    }
    applyOffer(e){
        var _this=this;
        var val = this.refs.offerInput.value;
        if(val.length <2){
            alert("please enter valid code");
        }else{
            var orderId="";
            if(Fleb.orderResp){
                orderId= Fleb.orderResp.txId
            }else{
                alert("Please try again later");
                return false;
            }
             Fleb.showLoader();
            var promoCode='promoCode='+val+'&orderId='+orderId;
            reqwest({			
				url:"/applyOffer"+promoCode
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
                     Fleb.applyOfferResp = resp;
						_this.setState({
                            isOffer:true,
                            offer:val
						}) 
                        Fleb.hideLoader();
				}
		})

        }
    }
    removeOffer(e){
        var orderId="";
        if(Fleb.orderResp){
            orderId= Fleb.orderResp.txId
        }else{
            alert("Please try again later");
            return false;
        }
        Fleb.showLoader();
        var _this=this;
        var promoCode='&orderId='+orderId;
            reqwest({			
				url:"/removeOffer"+promoCode
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
						_this.setState({
                            isOffer:false,
                            offer:""
						}) 
                        Fleb.hideLoader();
				}
		})

    }
    makePayment(){
        debugger;
        if(!Fleb.orderResp){
            alert("Please try another Lab or Date");
            return false;
        }
        Fleb.showLoader();
        var form = [
            '<form class="hidden" id="paymentForm" action="https://www.citruspay.com/flebie" >',
                '<input type="hidden" name="email" value='+this.state.patientData.email+'/>',
                '<input type="hidden" name="merchantTxnId" value='+Fleb.orderResp.txId+'/>',
                '<input type="hidden" name="orderAmount" value='+Fleb.amount+'/>',
                '<input type="hidden" name="currency" value="INR"/>',
                '<input type="hidden" name="secSignature" value='+Fleb.orderResp.signature+'/>',
                '<input type="hidden" name="returnUrl" value="https://www.flebie.com/paymentresponse"/>',
            '</form>'
        ].join("\n");
        // html: '<div ...>\n<h1 ...>Constructing HTML Elements<h1>\n</div>'
        this.ref.fakeForm.innerHTML = form;
        var paymentForm = document.getElementById("paymentForm");
        debugger;
        paymentForm.submit();
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
        debugger;
        if(this.state.timeSlotArray.length == 0){
            if(moment(this.state.date).format('MM/DD/YYYY') == moment().format('MM/DD/YYYY')){
                var d = new Date();
                var currentTime = d.getHours();
                var restrict = 0;
                if(currentTime >=14){
                    timeSlotArrayUI= <option value="">No Slots Available For This Date</option>
                }
                if(currentTime < 14){
                    restrict = currentTime+6;
                    timeSlotArrayUI = this.state.timeStringArray.map(function(item,index){
                        if(index >=restrict){
                            return <option value={item}>{item}</option>
                        }
                    })
                }
                
            }else{
            //timeSlotArrayUI=<option value="">No Slots Available For This Date</option>
            timeSlotArrayUI = this.state.timeSlotArray.map(function(item,index){
                    return <option value={item}>{item}</option>
            })
                    
            }
        }else{
            var d = new Date();
            var currentTime = d.getHours();
            var restrict = 0;
            var istomo=false;
            if(moment().add(1,'days').format('YYYY-MM-DD') == moment(this.state.date).format('YYYY-MM-DD') ){
                istomo=true;
            }
            
            if(currentTime >=22 && istomo){
                restrict = 7;
            }
            if(currentTime >=6 && !istomo){
                restrict =currentTime+4;
            }
            timeSlotArrayUI = this.state.timeSlotArray.map(function(item,index){
                if(index >=restrict){
                    return <option value={item}>{item}</option>
                }
            })
        }

         var schedulingUI = <div id="SchedulingBlock" className={(this.state.activetab==="SchedulingBlock")?"tab-main fade-in":"fade-out"}>
                <p>Convenience fee of INR 100 will be levied on home collection orders</p>
                <div className="clearfix">
                    <label className="radio-inline first-radio">
                        <input type="radio" name="ordertype" defaultChecked id="ordertype1" value="Home Collection"/> Home Collection
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="ordertype" id="ordertype2" value="Walk-in Appointment"/> Walk-in Appointment
                    </label>
                </div>
                <h4 className="sel-head">Select Date and Timeslot</h4>
                <div className="col2-row m20">
                    <SingleDatePicker
                            id="date_input"
                            date={this.state.date}
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
                            placeholder="Enter Adrress"/>

                        <span className={"hide"}>*</span>
                        <div ref={"errInput"} className="err-msg fade-out">"Please Enter Addres"</div>
                    </div>
                    <div className="form-row m20">
                        <label className="control-label ">Comments</label>
                        <input type="textarea" 
                            id="comments"
                            ref="commentBox"
                            className="form-control"/>

                        <span className={"hide"}>*</span>
                    </div>
                    <div className="clearfix">
                    <button id="getSchdulingInfo" className="btn btn-success fr btn-next curved" onClick={this.getSchedulingInfo.bind(this)}>Next</button>
                    </div>
        </div>;
        var paymentUI = <div id="paymentBlock" className={(this.state.activetab==="paymentBlock")?"tab-main fade-in":"fade-out"}>
            <h3>Payment</h3>
            <div className="clearfix payment-main">
                <div className="radio">
                    <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="Cash On Delivery" defaultChecked/>
                        Cash On Delivery
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="optionsRadios" id="optionsRadios2" value="Credit Card/Debit Card/Net Banking"/>
                        Credit Card/Debit Card/Net Banking
                    </label>
                </div>
            </div>
            <div className="offer-main">
                <div className="input-group">
                    <input type="text" defaultValue={this.state.offer} className="form-control" ref="offerInput" id="exampleInputAmount" placeholder="Enter Promo Code"/>
                    <div className="input-group-addon">
                        <button onClick={this.applyOffer.bind(this)} className={(!this.state.isOffer)?"btn btn-default":"hide"}>Apply</button>
                        <button onClick={this.removeOffer.bind(this)} className={(this.state.isOffer)?"btn btn-default":"hide"}>remove</button>
                    </div>
                </div>
            </div>
            <div  className="text-center make-payment clearfix">
                    <button id="MakePayment" className="btn btn-success fr btn-next curved" onClick={this.makePayment.bind(this)}>Proceed to Pay</button>                
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
                            <OpenCartModalContent triggerElem={false} isEditable={this.state.editableCart} header={true}/>
                        </div>
                    </div>



                </div>
                <div ref="fakeForm"/>
        </div>
        );
    }
}
export default CheckOut;