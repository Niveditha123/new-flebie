import React from 'react';
import reqwest from 'reqwest';

class CheckOut extends React.Component {
    constructor(props){
		super(props);
        this.state={
            activetab:"patientDetailsBlock",
            patientDetailsInfo:[]
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
                iconCSS:"icon icon-user"
            },
            {
                name:"email",
                id:2,
                errMsg:"Please Enter Email Id",
                required:true,
                waterMark:"Email",
                type:"email",
                iconCSS:"icon icon-email"
            },
            {
                name:"phone",
                id:3,
                errMsg:"Please Enter Email Id",
                required:true,
                waterMark:"Phone",
                type:"tel",
                iconCSS:"icon icon-mob"
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
                        placeholder={item.waterMark}/>
                </div>
                <span className={(item.required)?"required":"hide"}>*</span>
                <div className="err-msg fade-out">{item.errMsg}</div>
            </div>
        })
        var patientdetailsUI=<div id="patientDetailsBlock" ref="patientDetailsBlock" className={(this.state.activetab)?"tab-main fade-in":"fade-out"}>
            <h3>Patient Details</h3>
            <div className="form-content">
            {patientDetailsForm}
            <div className="form-row">
                <label className="radio-inline">
                    <input type="radio" name="gender" id="male" value="male"/> Male
                </label>
                <label className="radio-inline">
                    <input type="radio" name="gender" id="female" value="female"/> Female
                </label>
            </div>
            </div>
        </div>

        tabContentUI.push(patientdetailsUI);
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
                            <button onClick={this.openSection.bind(this)} data-target="SchedulingBlock" className={(this.state.activetab)?"btn btn-link active-tab":"btn btn-link"}>Scheduling</button>
                            <button onClick={this.openSection.bind(this)} data-target="paymentBlock" className={(this.state.activetab)?"btn btn-link active-tab":"btn btn-link"}>Payment</button>                            
                        </div>
                        <div className="tab-content">
                            {tabContentUI}
                        </div>

                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                    </div>



                </div>
        </div>
        );
    }
}
export default CheckOut;