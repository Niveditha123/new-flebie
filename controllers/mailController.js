var request =  require('unirest');
var Mailgun = require('mailgun-js');
var config 	= require("../config/index.js");

module.exports = {

    sendOrderSummaryEmail: function(req,res) {

        var orderId = req.query.orderId;
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var mailgun = new Mailgun({apiKey: config.MAILGUN_APIKEY, domain: config.MAILGUN_DOMAIN});
        var data = {
            //Specify email data
            from: config.SENDER,
            //The email to contact
            to: "adarsha.shetty.1989@gmail.com",
            //Subject and text data  
            subject: 'Hello from Mailgun',
            html: '<a href="https://www.flebie.com">Report Link</a>'
        };

        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data, function (err, body) {
            //If there is an error, render the error page
            if (err) {
                res.render('error', { error : err});
                console.log("got an error: ", err);
            }
            //Else we can greet    and leave
            else {
                //Here "submitted.jade" is the view file for this landing page 
                //We pass the variable "email" from the url parameter in an object rendered by Jade
                res.render('index');
                console.log(body);
            }
        });

    }
    
    
};

