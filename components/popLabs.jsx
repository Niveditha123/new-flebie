import React from 'react';
import reqwest from 'reqwest';

class PopularLabs extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popularLabs:[],
			gotList:false
        }
    }
    loadPopLabs(){
        var _this=this;
		Fleb.showLoader();
        reqwest({			
					url:"/getLabs"
					,headers:{
						"Access-Control-Allow-Origin":"*"
					}
					, method: 'get'
					, error: function (err) {
						_this.setState({
                            popularLabs:[],
							gotList:true
                        })  
						Fleb.hideLoader();
					}
					, success: function (resp) {
						    _this.setState({
                                popularLabs:resp,
								gotList:true
                            })   
							Fleb.hideLoader(); 
					}
			})

    }
    componentDidMount(){
        this.loadPopLabs.bind(this)();
	}
    showMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-in";
        e.preventDefault();
	}
	hideMoreDetails(e){
		var elem = e.target.getAttribute("data-target");
		this.refs[elem].className="lab-details fade-out";
        e.preventDefault();
	}
    render(){
        var popLabsUI=[];
        var _this=this;
        popLabsUI=this.state.popularLabs.map(function(lab,index){
            return <a className="list-item" href={"/test/list?labId="+lab.labId}>
					<div><div className="item-head">
						<button data-target={"labDetails"+index} onClick={_this.showMoreDetails.bind(_this)} className="btn btn-link icon icon-info"></button>
						<div className="fr price-block">
						</div>
					</div>
					<div className="lab-img img-block">
						<img src={"/public/images"+lab.labName+"_multi.jpg"}/>
					</div>
					<div className="lab-footer">
						<h3>{lab.labName}</h3>
						<h6>{lab.location}</h6>
						<div className="clearfix lab-options">
							<span className={(lab.isNABLAccredited)?"fl icon icon-tick":"hide"}/>
							<span className={(lab.isAvailableForHC)?"fl icon icon-home":"hide"}/>
							<span className={(lab.isAvailableForOB)?"fl icon icon-appointment":"hide"}/>
						</div>
					</div>
					<div ref={"labDetails"+index} className="lab-details fade-out">
					<div className="clearfix">
						<button data-target={"labDetails"+index} onClick={_this.hideMoreDetails.bind(_this)} className="fl btn btn-link icon icon-delete"/>
					</div>
					<div className="clearfix details-block">
						<div>
							<span className="icon icon-clock"/>{lab.operatingHours}
						</div>
						<div>
							<span className="icon icon-parking"/>{"Road side parking"}
						</div>
						<div>
							<span className="icon icon-waiting"/>{lab.averageWaitingTime+" mins"}
						</div>
						<div>
							<span className="icon icon-location"/>{lab.address}
						</div>
					</div>
				</div>
				</div>
			</a>
        })
		if(this.state.popularLabs.length === 0 && this.state.gotList){
			popLabsUI = <div className="no-content">
			<p> No labs are available!!!</p>
			</div>
		}
        return (
            <div className="poplabs-main ">
                <div className="banner-main">
                    <h1>Popular Labs</h1>
                    <p className="descrition-area">All labs that we have partnered with have been verified for quality and accuracy by our team of doctors. However, here's a list for the more brand conscious folks. With Flebie, you get to pick a lab that you have always sworn your allegiance for. We make sure we add a dash of us to make the whole experience much more convenient and rewarding. This list will also be updated based on the consumer behaviour with time.</p>
                </div>
                <div className="content-main">
                    <div className=" clearfix col3-main pop-labs lab-lists">
                        {popLabsUI}
                    </div>
                </div>
            </div>
        );
    }
}
export default PopularLabs;