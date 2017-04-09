var request =  require('unirest');
var config 	= require("../config/index.js");
var React = require('react');
var ReactDom  = require('react-dom/server');
var EmailTemplates =  require('../components/modules/emailTemplates.jsx');
var Promise = require('promise');
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
const col3 ={
    "width":200,
    "align":"left",
    "float":"left"
}
const secondItem={
    padding:"12px"
}

function sendToCient(orderObj,cb){
    var data = orderObj;
      
            var testList ="";
            data.orderItems.map(function(item,index){
                testList += '<tr><td style="padding:12px 0px 0px 0;font-weight:bold;color:#686868;">'+item.testName+'</td>';
                testList +='<td style="padding:12px 0px 0px 0;color:#686868;">'+'₹ '+item.quantity+'</td>';
                testList += '<td style="padding:12px 0px 0px 0;color:#686868;text-align:right;">'+'₹ '+item.itemTotal+'</td></tr>';
            });
            var emailHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">

                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Flebie Support</title>
                </head>

                <body style="width:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
                    <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <table width="600" align="center" cellpadding="0" cellspacing="0" style="font-family:&#x27;Open Sans&#x27;, sans-serif;" border="0" valign="top">
                                        <tbody>
                                            <tr>
                                                <td><span style="font-family:sans-serif;font-size:14px;line-height:14px;color:#000;"><img style="display:block;margin:0;" src="https://s3.ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-254076455009/static_resources/order_summary_email.png"/></span></td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom:12px;border-bottom:solid 1px #686868;font-family:Verdana;font-size:16px;font-weight:normal;line-height:32pxpx;color:#787878;">Hi ${data.orderDetails.firstName},<br/> Thanks for placing order with Flebie. This email contains important information regarding your recent purchase. Please save it for reference.</td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom:12px;border-bottom:solid 1px #686868;">
                                                    <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:12px 12px 0px 0;font-weight:bold;color:#686868;">Lab Name :${data.labName} </td>                                            
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td style="padding:12px 12px 0px 0;font-weight:bold;color:#686868"> OrderId : ${data.orderId}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:12px 12px 12px 0;font-weight:bold;color:#686868;border-bottom:solid 1px #686868;">Date &amp; Time : ${data.scheduleDate.split("T")[0] +"   "+ data.scheduleTime} </td>
                                            </tr>
                                            <tr>
                                                <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding:12px 0px 0px 0;font-weight:bold;color:#686868;">TEST NAME</td>
                                                            <td style="padding:12px 0px 0px 0;font-weight:bold;color:#686868;">QTY</td>
                                                            <td style="padding:12px 0px 0px 0;font-weight:bold;color:#686868;text-align:right;">PRICE</td>
                                                        </tr>
                                                        ${testList}
                                                    </tbody>
                                                </table>
                                            </tr>
                                            
                                            <tr>
                                                <td>
                                                    <table width="300" align="left" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:12px 12px 0px 0;font-weight:bold;color:#686868;">Convenience Fee</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="300" align="left" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" style="align:right;padding:12px 0px 0px 0;color:#686868;">${'₹ '+data.convenienceFee} </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="300" align="left" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding:12px 12px 0px 0;font-weight:bold;color:#686868;">Amount to collect</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="300" align="left" cellpadding="0" cellspacing="0" border="0" valign="top">
                                                        <tbody>
                                                            <tr>
                                                                <td align="right" style="align:right;padding:12px 0px 0px 0;color:#686868;">${'₹ '+data.grossTotal} </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>

            </html>`;
            var clientEmail = data.orderDetails.emailId;
            mg.messages.create(config.MAILGUN_DOMAIN, {
                from:config.SENDER,
                to: [clientEmail],
                subject: "Your Order with Flebie",
                html:emailHTML
            })
            .then(function(msg){ 
                cb(null,msg)
            })
             // logs response data
            .catch(function(err){ 
                cb(err,nul);
            });

}

function sendNotifications (orderObj, cb){
        var data = orderObj;
      
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
                <Item>
                    <Span>
                        <img style={{display:"block",margin:0}} src="https://s3.ap-south-1.amazonaws.com/elasticbeanstalk-ap-south-1-254076455009/static_resources/order_summary_email.png"/>
                    </Span>
                </Item>
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
           // var clientEmail = data.orderDetails.emailId;
            mg.messages.create(config.MAILGUN_DOMAIN, {
                from:config.SENDER,
                to: ['support@flebie.com'],
                subject: "Your Order with Flebie",
                html:emailHTML
            })
            .then(function(msg){ 
                cb(null,msg)
            })
             // logs response data
            .catch(function(err){ 
                cb(err,nul);
            });
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
              var sendNotPromise = new Promise(function (resolve, reject) {
                  sendNotifications(response.body,function(err,resp){
                        console.log("adsadsad succss")
                            if (err) {
                                reject(err);
                            }else{
                                resolve(res);
                            }
                            //res.send({orderid:orderid})
                        });
                    });

                var sendToClientPromise = new Promise(function(resolve,reject){
                    sendToCient(response.body,function(err,resp){
                         console.log("client succss")
                        if (err) {
                            reject(err);
                        }else{
                            resolve(res);
                        }
                    });
                })

                Promise.all([Promise.resolve(sendNotPromise), Promise.resolve(sendToClientPromise)])
                .then(function (response) {
                    console.log("all succss")
                    res.send({orderid:orderid});
                })
            }else{
              res.send({orderid:orderid})
            }
          });


    }
    
    
};

