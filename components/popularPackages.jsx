import React from 'react';
import reqwest from 'reqwest';
import ReactDOM from 'react-dom';

class Description extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var compList = this.props.packageIn.test.components;
        if(compList){
            compList = compList.split(",");
        }else{
            compList = [];
        }
        var list = compList.map(function(item,index){
            return <li>{item}</li>
        })
        var desription = (this.props.packageIn.test.description)?this.props.packageIn.test.description:"No Description available!";
    return(<div className="clearfix description-main">
            <button className='fl btn btn-link icon icon-delete' data-index={this.props.index} onClick={this.props.removeDetails} ></button>
            <div className="comp-list-main">
                <ul className={(list.length >0)?"comp-list":"hide"} >
                    {list}
                </ul>
                <h3 className={(list.length >0)?"hide":""}>
                    No Component Details available.
                </h3>
            </div>
            <div className={"desc-main"}>
                {this.props.packageIn.test.description}
            </div>
        </div>
        )
    }
}

class PopularPackages extends React.Component {
    constructor(props){
		super(props);
        this.state={
            popPackages:[],
            showDetails:false
        }
    }
    loadPopPackages(){
        var _this=this;
        Fleb.showLoader();
        		reqwest({			
				url:"/getPopPackages"
				, type: 'json'
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
					console.log(err,"err");
					Fleb.hideLoader();
					_this.setState({
					     popPackages:[]

					})
				}
				, success: function (resp) {
					console.log(resp,"success");
					Fleb.hideLoader();
						_this.setState({
                            popPackages:resp
						})
					}
				})
	}
    componentDidMount(){
        this.loadPopPackages.bind(this)();
    }
    findAnItem(item,list,prop){
		var found={
			data:{},
			pos:0,
			in:false
		};
		for(var i=0;i<list.length;i++){
				if(item == list[i][prop]){
					found.data=list[i];
					found.in=true;
					found.pos=i;
					break;
				}
			}
        return found;
    }
    

    createNewCart(data){
        var cart={
            labAddress:data.lab.address,
            labName:data.lab.labName,
            totalItems:1,
            totalListPrice:data.MRP,
            totalPrice:data.offerPrice,
            userEmail:"",
            isAvailableForOB:data.lab.isAvailableForOB,
            isHomeCollectible:data.testId.isHomeCollectible,
            labId:data.lab.labId,
            orderItems:[{
                isHomeCollectible:data.isHomeCollectible,
                labTestId:data.labTestId,
                listPrice:data.MRP,
                price:data.offerPrice,
                quantity:1,
                testName:data.labTestName
            }]
        };
        return cart;
    }
    openKart(e){
        var id= e.target.getAttribute("data-lab");
        var test = e.target.getAttribute("data-test");
        var localData = localStorage.getItem("cartInfo");
        if(localData){
            var cartInfo = JSON.parse(localData);
            if(cartInfo.labName == id){
                var item = this.findAnItem(id,this.state.popPackages,"labTestName");
                var localItem = this.findAnItem(test,cartInfo.orderItems,"testName");
                if(localItem.in){
                    cartInfo.orderItems[localItem.pos].quantity+=1;
                    cartInfo.totalItems+=1;
                    cartInfo.totalListPrice +=item.data.MRP;
                    cartInfo.totalPrice +=item.data.offerPrice;
                }else{
                    var newItem ={
                        "testName":item.data.labTestName,
                        "price":item.data.offerPrice,
                        "listPrice":item.data.MRP,
                        "quantity":1,
                        //"isHomeCollectible":item.data.test.isHomeCollectible,
                        "labTestId":item.data.labTestId
                    }
                    cartInfo.orderItems.push(newItem);
                    cartInfo.totalItems+=1;
                    cartInfo.totalListPrice+=item.data.offerPrice;
                    cartInfo.totalPrice+=item.data.MRP;
                }
                Fleb.eventDispatcher("updateCart",cartInfo);
            }else{
                //var item = this.findAnItem(id,this.state.popPackages,"labTestName");
                var item =  Fleb.findAnItemDeep(id,this.state.popPackages,["lab","labName"]);
                var cartData= this.createNewCart.bind(this)(item.data);
                Fleb.eventDispatcher("updateCart",cartData);
            }

        }else{
             var item =  Fleb.findAnItemDeep(id,this.state.popPackages,["lab","labName"]);
            var cartData= this.createNewCart.bind(this)(item.data);
            Fleb.eventDispatcher("updateCart",cartData);
        }
        Fleb.eventDispatcher("toggleCartModal",{flag:true});
        document.getElementById("openCart").click();
    }
    removeThis(e){
        var _this = this;
        var dataId = e.target.getAttribute("data-index");
        this.refs["details"+dataId].className = "details-drop fade-out";
        setTimeout(function(){
            _this.refs["details"+dataId].innerHTML="";
        },100)
    }
    showDetails(e){
        var dataId = e.currentTarget.getAttribute("data-index");
        var elem;
        var _this = this;
        if(dataId != null || dataId != ""){
            var currentPackage = this.state.popPackages[dataId];
            elem = this.refs["details"+dataId];
            if(elem.innerHTML == ""){
                ReactDOM.render(<Description index={dataId} packageIn={currentPackage} removeDetails={this.removeThis.bind(this)}  />,elem);
            setTimeout(function(){
                _this.refs["details"+dataId].className="details-drop fade-in"
            },10)
            }
            
        }
         
    }
    render(){
            var popPackagesUI=[];
            var _this=this;


            popPackagesUI= this.state.popPackages.map(function(item,index){
                var test = item.testId;
                return <div key={index} className="list-item cursor" data-index={index} onClick={_this.showDetails.bind(_this)}>
                    
					<div>
                        <div className="details-drop fade-out" ref={"details"+index}></div>
                    <div className="item-head">
						<div className="fr price-block">
							<div className="striked-price"><span className="icon icon-rupee"/>{item.MRP}</div>
							<div className="actual-price"><span className="icon icon-rupee"/>{item.offerPrice}</div>
						</div>
					</div>
					<div className="lab-img img-block">
                        <img src={"/public/images/"+item.lab.labName+"_multi.jpg"}/>
					</div>
					<div className="lab-footer">
						<h3>{item.labTestName}</h3>
						<h6>{item.lab.labName}</h6>
						<div className="clearfix">
							<button data-id={index} data-lab={item.lab.labName} data-test={item.labTestName} onClick={_this.openKart.bind(_this)} className="fr btn-btn-success bookme flebie-btn">BOOK ME</button>
						</div>
					</div>
				</div>
			</div>
            })
        return (
            <div className="clearfix content-main pop-package">
                <div className="banner-main">
                    <h1>Popular Packages</h1>
                    <p className="descrition-area">No matter how cliched it might sound, we are staunch believers in the adage "Prevention Is Better Than Cure". How many times have you chosen a meeting over a breakfast, binged on those fries and boozed late into the night and skipped those morning jogs? More often that not, our health ends up taking a backseat. Keep a tab on your health by getting yourself checked regularly. These packages have been handpicked keeping in mind various factors like your age, lifestyle and eating habits.</p>
                </div>

                <div className="clearfix lab-lists col3-main">
                    {popPackagesUI}
                </div>

            </div>
        );
    }
}
export default PopularPackages;