var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("search");
  },
  getLabTestsFromTestNames:function(req,res,next){

        var headers={

    };
;
console.log(req.query.tests, "url");
var query = req.query.tests;
  request.get(config.API_DOMAIN+'labTest/getLabTestsFromTestNames?tests='+query)
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