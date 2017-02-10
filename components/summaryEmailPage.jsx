import React from 'react';import Modal from './utils/modal.jsx';
import reqwest from  'reqwest';

var najax = require('najax');

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            order: null
        }
    }
    componentWillMount(){

    }
    getOrderAndOrderDetails(){

        var _this = this;
        var id = Fleb.getQueryVariable("id");

        reqwest({
            url:"/getOrder?id="+id
            ,headers:{
                "Access-Control-Allow-Origin":"*"
            }
            , method: 'get'
            , error: function (err) {
                Fleb.hideLoader();
                _this.setState({
                    error:true,
                    loading:false
                })
            }
            , success: function (resp) {
                _this.setState({
                    order:resp,
                    error:false,
                    loading:false
                });
                Fleb.hideLoader();

            }
        })


    }
    componentDidMount(){

    }
    
    render(){

        var orderAndOrderDetails = <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <title>Flebie</title>
        </head>
        <body >
        <table cellSpacing="0" cellPadding="0" width="600" bgColor="#fff" style={{align: "center"}} className="wrappertable">
            <tbody>
            </tbody>
        </table>
        </body>
        </html>;
        return ({orderAndOrderDetails});
    }
}

export default Index;

/*

 */