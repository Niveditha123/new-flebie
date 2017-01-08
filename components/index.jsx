import React from 'react';
import reqwest from 'reqwest';
import Modal from './utils/modal.jsx';

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchResults:[],
			getLists:[],
			selectedList:[],
			loadedList:false,
			listLoadError:false,
			showSuggest:false,
			inputEntry:"",
			filterList:[],
			errrMsgs:""
		}
	}
	componenDidMount(){

	}
	loadTests(){
		var _this = this;
		reqwest({			
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromTestNames?tests=Vitamin B6 (Pyridoxin), Serum;"
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests"
				url:"/getList"
				, type: 'json'
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
					console.log(err,"err")
					_this.setState({
						listLoadError:true
					})
				}
				, success: function (resp) {
					console.log(resp,"success");
						_this.setState({
							getLists:resp,
							loadedList:true,
							listLoadError:false
						})
					}
				})
	}
	componentDidMount(){
		this.loadTests.bind(this)();
	}
	getResults(e){
		let value = e.target.value;
		var _this = this;

		this.setState({
				inputEntry:value
			})
		if(value.length >2){
		var resultArray = this.state.getLists.filter(function(item){
			if(item.name.toUpperCase().indexOf(value.toUpperCase()) >=0 ){
				return item;
			}
			//return name.match(value);
		});
		if(resultArray.length > 0){
			this.setState({
				showSuggest:true,
				filterList:resultArray,
				errrMsgs:""
			})
		}else{
			this.setState({
				errrMsgs:"No Results Found"
			})
		}
		}else{
			this.setState({
				showSuggest:false,
				filterList:[],
				errrMsgs:""
			})
		}
		/*if(value.length >2){
			reqwest({
				
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromTestNames?tests=Vitamin B6 (Pyridoxin), Serum;"
				//url:"http://lowcost-env.hppsvuceth.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests"
				url:"/getList"
				, type: 'json'
				,headers:{
					"Access-Control-Allow-Origin":"*"
				}
				, method: 'get'
				, error: function (err) {
					console.log(err,"err")
				}
				, success: function (resp) {
					console.log(resp,"success");
						_this.setState({
							getLists:resp
						})
					}
				})
		}else{

		}*/
	}
	setSearchParams(e){
		var selected= e.target.innerHTML;
		var set = true;
		var list = this.state.selectedList;
		for(var i = 0;i< list.length;i++){
			if(selected == list[i]){
				set = false;
			}
		}
		if(set){
			list.push(selected);
			this.setState({
				selectedList :list,
				showSuggest:false,
				inputEntry:""
			})
			this.refs.suggestInput.focus();
		}
	}
	removeItem(e){
		var val = e.target.getAttribute("data-value");
		var curParam = this.state.selectedList;
		var id = curParam.indexOf(val);
		curParam.splice(id,1);
		this.setState({
			selectedList:curParam,
			inputEntry:""
		})

	}
	goToSearch(e){
		var query = this.state.selectedList.join(";")
		location.href = "/multisearchlabs";
	}
	render(){
		var results = [];
		var selectedListUI = [];
		var _this=this;
		var goBtn=[];
		var callContent= <div className="modal-body">
			<div className="modal-header">
				<h3>Customer Support</h3>
			</div>
		</div>
		if(this.state.selectedList.length >0){
			goBtn = <a href={"/multisearchlabs?"+this.state.selectedList.join(";")}  className="btn btn-go">GO</a>	
		}else{
			goBtn = <button disabled className="btn btn-go disabled"> Go</button>
		}
		results = this.state.filterList.map(function(item,index){
			return <div key={index}>
				{item.name}
			</div>
		})
		selectedListUI = this.state.selectedList.map(function(item,index){
			return <span key={index} className="selected-item">{item}
			<button data-value={item} className="btn btn-close" onClick={_this.removeItem.bind(_this)}>x</button>
			</span>
		})
		return (<div className="banner-main">
		<div className="banner-block">
			<h1>Diagnostic Healthcare Simplified !</h1>
			<p>Search Tests, Book Home Visits And Appointments, Relax</p>
		</div>
		<div className="material-input home-input">
			<div className={(this.state.selectedList.length>0)?"selected-list clearfix":"hide"}>
				{selectedListUI}
			</div>
			<input type="text" ref="suggestInput"className="input-ctrl" value={this.state.inputEntry} placeholder="Search one or more tests (For Eg: CBC, TSH, etc.)" onChange={this.getResults.bind(this)} />
			<div onClick={this.setSearchParams.bind(this)} className={(this.state.showSuggest)?"results-block":"hide"}>
				{results}
				<div className={(this.state.loadedList)?"hide":"loader-wrap"}>
				<div className="sk-circle">
					<div className="sk-circle1 sk-child"></div>
					<div className="sk-circle2 sk-child"></div>
					<div className="sk-circle3 sk-child"></div>
					<div className="sk-circle4 sk-child"></div>
					<div className="sk-circle5 sk-child"></div>
					<div className="sk-circle6 sk-child"></div>
					<div className="sk-circle7 sk-child"></div>
					<div className="sk-circle8 sk-child"></div>
					<div className="sk-circle9 sk-child"></div>
					<div className="sk-circle10 sk-child"></div>
					<div className="sk-circle11 sk-child"></div>
					<div className="sk-circle12 sk-child"></div>
				</div>
			</div>
			</div>
			<div className={(this.state.errrMsgs.length>0)?"error-drop":"hide"}>
				{this.state.errrMsgs}
			</div>
		</div>
		<div className="text-center">
			{goBtn}
		</div>

		<div className="marketing-block">
			<a href="/PopularTests">
				<img src="/public/images/icons/PopularTests_icon2.png" alt="Popular Tests" className="img-circle"/>
				<h3>Popular Tests</h3>
			</a>
			<a href="/popularlabs">
				<img src="/public/images/icons/HomePageLabs.png" alt="Popular Labs" className="img-circle"/>
				<h3>Popular Labs</h3>
			</a>
			<a href="/popularpackages">
				<img src="/public/images/icons/HomePagePackages.png" alt="Popular Packages" className="img-circle"/>
				<h3>Popular Packages</h3>
			</a>
		</div>
		<Modal open={this.state.openContact} content={callContent}/>
		 </div> );
	}
}

export default Index;

/*

			*/