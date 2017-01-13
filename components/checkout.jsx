import React from 'react';
import reqwest from 'reqwest';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import  OpenCartModalContent from './modules/editCart.jsx';

class CheckOut extends React.Component {
    constructor(props){
		super(props);
        this.state={
            activetab:"SchedulingBlock",
            patientDetailsInfo:[],
            enableScheduling:false,
            enablePayment:false,
            patientData:{},
            date: moment(),
            focused:false,
            timeSlotArray:[],
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
                reg:/^[a-zA-Z ]+$/
            },
            {
                name:"email",
                id:2,
                errMsg:"Please Enter Email Id",
                required:true,
                waterMark:"Email",
                type:"email",
                iconCSS:"icon icon-email",
                reg:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            {
                name:"phone",
                id:3,
                errMsg:"Please Enter Phone number",
                required:true,
                waterMark:"Phone",
                type:"tel",
                iconCSS:"icon icon-mob",
                reg:/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/
            },
            {
                name:"age",
                id:4,
                errMsg:"Please Enter Age",
                required:false,
                waterMark:"Age",
                type:"number",
                iconCSS:"icon icon-age"
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
                    }
                }else{
                    if(name === "age"){
                        if( val >=0 && val <= 150 ) {
                             errElem.className="err-msg fade-out"
                             patientData[name]= val;
                        }else{
                             errElem.className="err-msg";
                             patientData[name]= "";
                        }
                    }
                }
            }else{
                errElem.className="err-msg";
                patientData[name]= "";
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
        }else{
            patientData["gender"]= isGender;
            this.refs.errInputGen.className="err-msg fade-out";            
        }
        this.setState({
            enableScheduling:true,
            patientData:patientData,
            activetab:"SchedulingBlock"
        })
    }
    getTimeSlots(){
        var _this = this;
        var date = moment(this.state.date).format('YYYY-MM-DD');
        date="2016-12-16";
		reqwest({			
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromTestNames?tests=Vitamin B6 (Pyridoxin), Serum;"
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests"
				//url:"/getMultiLabs"
				url:"http://lowcost-env.qxsdp2qnuv.ap-south-1.elasticbeanstalk.com/api/v0.1/timeSlot/getAvailableSlots?sessionKey=pONzFZqnt23E9BaFDPMtBmoUARvLOhmTbmAE/o9dKXuGh5AjRUQjYwXiQgG6lqMi&slotDate="+date
				, type: 'json'
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
					console.log(err,"err")
					_this.setState({
						timeSlotArray:[]
					})
				}
				, success: function (resp) {
					console.log(resp,"success");
                    var slotArray = _this.state.timeStringArray.slice();
						_this.setState({
                            timeSlotArray:slotArray
						})
					}
				})
    }
    dateChanged(date){
        this.setState({ 
            date:date
        },function(){
            this.getTimeSlots.bind(this)()
        });
    }
    getSchedulingInfo(){
        this.setState({
            enablePayment:true,
            activetab:"paymentBlock"
        })
    }
    makePayment(){

    }
    render(){
        var tabContentUI =[];
        var patientDetailsForm=[];
        patientDetailsForm = this.state.patientDetailsInfo.map(function(item,index){
            return <div className="form-row">
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
            <div ref="genderBlock" className="form-row input-row">
                <label className="radio-inline">
                    <input type="radio" name="gender" className="radio-ctrl" id="male" value="male"/> Male
                </label>
                <label className="radio-inline">
                    <input type="radio" name="gender" className="radio-ctrl" id="female" value="female"/> Female
                </label>
            </div>
            <div ref="errInputGen" className="err-msg fade-out">Please select gender</div>
            <button id="getPatientInfo" className="btn btn-success fr btn-next curved" onClick={this.getPatientInfo.bind(this)}>Next</button>
            </div>
        </div>
        var timeSlotArrayUI = [];
        if(this.state.timeSlotArray.length == 0){
            if(moment(this.state.date).format('MM/DD/YYYY') == moment().format('MM/DD/YYYY')){
                timeSlotArrayUI= <option value="">"Not insame day"</option>
            }else{
            timeSlotArrayUI=<option value="">"Please select another date"</option>
                    
            }
        }else{
            timeSlotArrayUI = this.state.timeSlotArray.map(function(item,index){
            return  <option value={item}>{item}</option>
            })
        }

         var schedulingUI = <div id="SchedulingBlock" className={(this.state.activetab==="SchedulingBlock")?"tab-main fade-in":"fade-out"}>
                <p>Convenience fee of INR 100 will be levied on home collection orders</p>
                <div className="clearfix">
                    <label className="radio-inline">
                        <input type="radio" name="ordertype" defaultChecked id="ordertype1" value="Home Collection"/> Home Collection
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="ordertype" id="ordertype2" value="Walk-in Appointment"/> Walk-in Appointment
                    </label>
                </div>
                <h4>Select Date and Timeslot</h4>
                <div className="col2-row">
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
                        <select className="form-control">
                            {timeSlotArrayUI}
                        </select>
                    </div>
                </div>
                    <div className="form-row">
                        <label className="control-label ">Address</label>
                        <input type="textarea" 
                            id="address"
                            className="form-control"
                            placeholder="Enter Adrress"/>

                        <span className={"hide"}>*</span>
                        <div ref={"errInput"} className="err-msg fade-out">"Please Enter Addres"</div>
                    </div>
                    <div className="form-row">
                        <label className="control-label ">Comments</label>
                        <input type="textarea" 
                            id="comments"
                            className="form-control"/>

                        <span className={"hide"}>*</span>
                    </div>
                    <button id="getSchdulingInfo" className="btn btn-success fr btn-next curved" onClick={this.getSchedulingInfo.bind(this)}>Next</button>
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
                    <input type="text" className="form-control" id="exampleInputAmount" placeholder="Enter Promo Code"/>
                    <div className="input-group-addon">
                        <button className="btn btn-default">Apply</button>
                    </div>
                </div>
            </div>
            <div  className="text-center">
                    <button id="MakePayment" className="btn btn-success fr btn-next curved" onClick={this.makePayment.bind(this)}>Proceed to Pay</button>                
            </div>
        </div>

        tabContentUI.push(patientdetailsUI,schedulingUI,paymentUI);
        return (
            <div className="checkout-main">
                <div className="checkout-banner">
                    <h1>Checkout</h1>
                    <p>We are glad you found what you were looking for. We need a few details from you before proceeding with your order. We promise you not to spam your inbox or pester you with unnecessary calls. Your online transactions are also secure. So, go ahead, confirm your order.</p>
                    <br/>
                    <br/>
                    <p>*A nominal fee of 100 will be charged for home collection services</p>
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
                            <OpenCartModalContent triggerElem={false} header={true}/>
                        </div>
                    </div>



                </div>
        </div>
        );
    }
}
export default CheckOut;