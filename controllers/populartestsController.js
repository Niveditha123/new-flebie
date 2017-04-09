var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("populartests");
  },
  getPopTest:function(req,res,next){
        var headers={

    };

    request.get(config.API_DOMAIN+'test/getAllTests')
        .headers(headers)
        .end(function (response) {
          console.log(response.status);
          if(response.status == 200){
            var popTests = [];
            if(Array.isArray(response.body)){
              for(var i=0;i<response.body.length;i++){
                if(response.body[i].isPopular){
                  popTests.push(response.body[i]);
                }
              }
              res.send(popTests);
            }
          }else{
            res.send([])
          }
        });

  }
};