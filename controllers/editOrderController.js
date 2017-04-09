var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    var order = null;
    if(req.cookies.ums != null)
    {
        res.render("editOrder");
      
    }
    else {
      res.render("index");
    }
  },
  getOrder:function(req,res,next){


    var headers={

    };
    var query = req.query.id;

    request.get(config.API_DOMAIN+'order/getOrder?id='+query)
        .headers(headers)
        .end(function (response) {
          console.log(response.status);
          if(response.status == 200){
            console.log(response.body,"order details");
            res.send(response.body);
          }else{
            res.send({})
          }
        });
  },
  getUserUsingSessionKey:function(sessionKey){
    var user = null;
    var headers={

    };
    request.get(config.API_DOMAIN+'order/getUserUsingSessionKey?='+sessionKey)
        .headers(headers)
        .end(function (response) {
          console.log(response.status);
          if(response.status == 200){
            user = response.body;
          }else{
            user = null;
          }
        });
  }
  
};