var request =  require('unirest');
var config 	= require("../config/index.js");
var React = require('react');
var ReactDom  = require('react-dom/server');
var EmailTemplates =  require('../components/modules/emailTemplates.jsx');
  var CustomerEmailObj = React.createFactory(EmailTemplates.CustomerEmail);


  import ReactHTMLEmail from 'react-html-email';

  

// set up React to support a few HTML attributes useful for legacy clients
ReactHTMLEmail.injectReactEmailAttributes()

import { Email, Item, Span, A, renderEmail,Box } from 'react-html-email';


  var bcc = config.BCC_EMAIL;
  var fromId = config.SENDER;
  console.log(config,"conmf");
var mailgun = require('mailgun.js');
var mg = mailgun.client({username: "api", key:config.MAILGUN_APIKEY});

function sendNotifications (orderObj, cb){
        var data = orderObj;
        const textStyles = {
            fontFamily:'Verdana',
            fontSize: '20px',
            fontWeight: 'normal',
            lineHeight: '32px',
            color: '#787878'
        };
        const itemHeadCss={
            align:"left",
            paddingBottom:"12px",
            borderBottom:"solid 1px #787878"
        };
        const itemHeadCss2 = {
            align:"left",
            padding:"12px 12px 12px 0",
            fontWeight:"bold",
            color: '#787878'
        }
        const itemHeadlbl2 = {
            align:"right",
            padding:"12px 0px 12px 0",
            color: '#787878'
        }

        const dfaultBox = {
            "width":600,
            "align":"center"
        }
        const horizBox = {
            "width":300,
            "align":"left",
            "float":"left"
        }
        const secondItem={
            padding:"12px"
        }
        var tests = "";
        for(var i =0;i<data.orderItems.length;i++){
            var test = data.orderItems[i].testName;
            if(i>0){
                test=" ,"+test
            }
            tests += test;
        }
        const emailHTML = renderEmail(
            <Email title="Flebie Support" style={{fontFamily:"'Open Sans', sans-serif"}}>
                <Item style={{paddingBottom:"12px",borderBottom:"solid 1px #686868"}} >
                    <Span {...textStyles}>
                        Hi,
                        <br/> We just received an order. Please find the order details below.
                    </Span>
                </Item>
                <Item style={{paddingBottom:"12px",borderBottom:"solid 1px #686868"}} >
                    <Box {...dfaultBox} >
                        <Item {...secondItem} >
                            <Box {...horizBox}>
                                <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}> OrderId</Item>
                            </Box>
                            <Box {...horizBox}>
                                <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.orderId}</Item>
                            </Box>
                        </Item>
                        <Item {...secondItem}>
                            <Box {...horizBox}>
                                <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Lab Name</Item>
                            </Box>
                            <Box {...horizBox}>
                                <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.labName}</Item>
                            </Box>
                        </Item>
                    </Box>
                </Item>
                 <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Client Name</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.orderDetails.firstName}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Client Address</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.orderDetails.address}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Phone Number</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.orderDetails.phoneNumber}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Age</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.orderDetails.age}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Gender</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} ></Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Test Ordered</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {tests}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Scheduled Date/Time</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > </Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Amount to collect</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} >{data.grossTotal} </Item>
                    </Box>
                </Item>
            </Email>
            )
            console.log(data,emailHTML,"rendered email")
            var clientEmail = data.orderDetails.emailId;
            mg.messages.create(config.MAILGUN_DOMAIN, {
                from:config.SENDER,
                to: [clientEmail],
                subject: "Your Order with Flebie",
                html:emailHTML
            })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error
            cb();
    }
module.exports = {

    processConfirmation: function(req,res,next) {

        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var data= req.body;
        var pD = JSON.stringify(data);
        res.render("confirmPayment",{data:pD});    

    },
    processAll:function (req,res,next){
        var data = req.body;
        //var renderedHTML = ReactDom.renderToString(CustomerEmailObj({data:data}));
        var headers={};
        var orderid = req.query.id;
        console.log(orderid,"orderid");
         request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/getOrder?id='+orderid)
          .headers(headers)
          .end(function (response) {
            console.log(response.status);
            if(response.status == 200){
              sendNotifications(response.body,function(){
                  console.log("adsadsad succss")
                  res.send({orderid:orderid})
              });
            }else{
              res.send({orderid:orderid})
            }
          });


    }
    
    
};

