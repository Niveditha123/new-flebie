import React from 'react';
import reqwest from 'reqwest';
import  OpenCartModalContent from './modules/editCart.jsx';

class CheckOut extends React.Component {
    constructor(props){
		super(props);
        this.state={
            activetab:"patientDetailsBlock",
            patientDetailsInfo:[],
            enableScheduling:false,
            enablePayment:false,
            patientData:{}
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
        debugger;
        this.setState({
            enableScheduling:true
        })
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
            <div className="form-row input-row">
                <label className="radio-inline">
                    <input type="radio" name="gender" id="male" value="male"/> Male
                </label>
                <label className="radio-inline">
                    <input type="radio" name="gender" id="female" value="female"/> Female
                </label>
            </div>
            <button id="getPatientInfo" className="btn btn-success fr btn-next curved" onClick={this.getPatientInfo.bind(this)}>Next</button>
            </div>
        </div>
         var schedulingUI = <div id="SchedulingBlock" className={(this.state.activetab==="SchedulingBlock")?"tab-main fade-in":"fade-out"}>
                <h3>Scheduling Details</h3>
                <div className="">
                </div>
        </div>;
        var paymentUI = <div id="paymentBlock" className={(this.state.activetab==="SchedulingBlock")?"tab-main fade-in":"fade-out"}>
            <h3>Payment</h3>
        </div>

        tabContentUI.push(patientdetailsUI,schedulingUI);
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
                            <button onClick={this.openSection.bind(this)} data-target="patientDetailsBlock" className={(this.state.activetab)?"btn btn-link active-tab":"btn btn-link"}>Patient details</button>
                            <button onClick={this.openSection.bind(this)} disabled={(this.state.enableScheduling?"":"disabled")} data-target="SchedulingBlock" className={(this.state.activetab)?"btn btn-link active-tab":"btn btn-link"}>Scheduling</button>
                            <button onClick={this.openSection.bind(this)} disabled={(this.state.enablePayment?"":"disabled")} data-target="paymentBlock" className={(this.state.activetab)?"btn btn-link active-tab":"btn btn-link"}>Payment</button>                            
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