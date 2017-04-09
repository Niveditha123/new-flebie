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
module.exports = {

    processConfirmation: function(req,res,next) {

        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var data= {
 "TxStatus": "SUCCESS",
 "TxId": "1465302375",
 "TxRefNo": "CTX1606071226402805501",
 "pgTxnNo": "2000005952",
 "pgRespCode": "0",
 "TxMsg": "Transaction Successful",
 "amount": "1.00",
 "authIdCode": "626081",
 "issuerRefNo": "615922626081",
 "signature": "970ed7a0166c371af222c633104e49cf0024d958",
 "paymentMode": "CREDIT_CARD",
 "TxGateway": "AXIS PG (Citrus Plus)",
 "currency": "INR",
 "maskedCardNumber": "512345XXXXXX2346",
 "cardType": "MCRD",
 "cardHolderName": "Amey Joshi",
 "txn3DSecure": "A",
 "eci": "01",
 "txnType": "SALE",
 "requestedCurrency": "",
 "requestedAmount": "",
 "mcpCurrency": "",
 "mcpAmount": "",
 "offerExchangeRate": "",
 "firstName": "Amey",
 "lastName": "Joshi",
 "email": "amey.joshi@citruspay.com",
 "mobileNo": "9819450401",
 "addressStreet1": "",
 "addressStreet2": "",
 "addressCity": "Panjim",
 "addressState": "Goa",
 "addressCountry": "India",
 "addressZip": "411038",
 "txnDateTime": "2016-06-07 17:55:49"
};
        var pD = JSON.stringify(data);
        res.render("confirmPayment",{data:pD});    

    },
    processAll:function (req,res,next){
        var data = req.body;
        //var renderedHTML = ReactDom.renderToString(CustomerEmailObj({data:data}));
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
                                <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.TxId}</Item>
                            </Box>
                        </Item>
                        <Item {...secondItem}>
                            <Box {...horizBox}>
                                <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Lab Name</Item>
                            </Box>
                            <Box {...horizBox}>
                                <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.firstName +" "+ data.lastName}</Item>
                            </Box>
                        </Item>
                    </Box>
                </Item>
                 <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Client Name</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.firstName +" "+ data.lastName}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Client Address</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.addressStreet1+" "+data.addressStreet2 +" "+ data.addressCity+" "+data.addressState+" "+data.addressCountry+" "+data.addressZip}</Item>
                    </Box>
                </Item>
                <Item {...secondItem}>
                    <Box {...horizBox}>
                        <Item style={{padding:"12px 12px 0px 0",fontWeight:"bold",color: '#686868'}}>Phone Number</Item>
                    </Box>
                    <Box {...horizBox}>
                        <Item align="right" style={{align:"right",padding:"12px 0px 0px 0",color: '#686868'}} > {data.mobileNo}</Item>
                    </Box>
                </Item>
            </Email>
            )
            console.log(data,emailHTML)
            
            mg.messages.create(config.MAILGUN_DOMAIN, {
                from:config.SENDER,
                to: ["manusunny999@gmail.com"],
                subject: "Your Order with Flebie",
                html:emailHTML
            })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error
            res.send({html:emailHTML})

    }
    
    
};

