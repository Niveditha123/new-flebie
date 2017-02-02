import React from 'react';
import reqwest from 'reqwest';

class Dashboard extends React.Component {
    constructor(props){
		super(props);
        this.state={
            test:[]
        }
    }
    
    componentDidMount(){
        
        
	}

    render(){
      
        return (
            <div className="dashboard-main">
                <h1 style={{textAlign: "center"}}>LAB ADMIN DASHBOARD</h1> 
                <div style={{ color: "grey" , textAlign: "center" }} className="alert alert-danger" id="connectionAlert" >Not connected to internet</div> 
                <div className="container-fluid" style={{backgroundColor: "rgba(255,255,255,0.60)"}} >
                    <div className="row">
                        <div className="col-lg-4">
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
                        
                        <div className="col-lg-6"></div>
                        <div className="col-lg-2">
                            <a className="btn btn-info" id="createANewOrder" style={{backgroundColor:"#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%"}}> New Order</a>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <label> CHECK AVAILABILITY</label>
                        </div>
                        <div className="col-lg-3">
                            <input className="form-control text-center required_field" type="text" name="slotDate" id="slotDate"/>
                        </div>
                        <div className="col-lg-5">
                            <textarea name="slotTime" id="slotTime" readOnly  style={{height: "250px", float: "center"}}/>
                        </div>
                    </div>    
                    <div className="row">
                            <div className="col-lg-10">
                            </div>
                            <div className="col-lg-2">
                                <button className="btn btn-info" style={{backgroundColor: "#00CF17", color:"black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", float: "right"}}>
                                    <span className="glyphicon glyphicon-refresh">  Refresh </span>
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <input className="form-control text-center required_field" type="text" name="fromDate" id="fromDate"/>
                                </div>
                                <div className="col-lg-6">
                                </div>
                                <div className="col-lg-3">
                                    <input className="form-control text-center required_field" type="text" name="toDate" id="toDate"/>
                                </div>   
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
                            </tbody>

                        </table>
                        
                    <br/>
                    <br/>
                    </div>
                    <div className="row">
                        <button className="btn btn-info" id="getCSVData" style={{ backgroundColor: "#00CF17", color: "black", marginTop: "1%", marginBottom: "1%", marginLeft: "1%", marginRight: "1%", textAlign: "right"}}>
                            <span className="glyphicon glyphicon-download-alt">Export</span>
                        </button>
                    </div>    
            <div className="jumbotron">
                    <h1>Hello, world Test Bootstrap!</h1>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
                    </div>
                </div>

            </div>
            
        );
    }
}
export default Dashboard;
