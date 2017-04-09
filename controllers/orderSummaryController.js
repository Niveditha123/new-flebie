var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {



    renderPage:function(req,res,next){
        console.log(" order id is: "+req.query.id);
        var user = null;
        
            res.render("orderSummaryPage");
        

    },
    getOrderSummary:function(req,res,next){
        var headers={

        };

        request.get(config.API_DOMAIN+'test/getAllTests')
            .headers(headers)
            .end(function (response) {
                console.log(response.status);
                if(response.status == 200){
                    res.send(response.body);
                }else{
                    res.send([])
                }
            });
    }


};