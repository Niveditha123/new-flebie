var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("popularpackages");
  },
  getPopPackages:function(req,res,next){
    var headers={

    };
      request.get(config.API_DOMAIN+'package/getAllPackages')
          .headers(headers)
          .end(function (response) {
            console.log(response.body,"popular packages");
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send([])
            }
          });
  }
};