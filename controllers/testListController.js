var request =  require('unirest');
var userController = require('../controllers/userController.js');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("testlist");
  },
  getLabTestsFromLabId:function(req,res,next){
            var headers={

                };
            console.log(req.query.labId, "url");
            var query = req.query.labId;
              request.get(config.API_DOMAIN+'labTest/getLabTestsFromLabId?labId='+query)
                      .headers(headers)
                      .end(function (response) {
                         
                        console.log(response.status);
                        if(response.status == 200){
                          res.send(response.body);
                        }else{
                          res.send({})
                        }
                      });
  },
  getLab:function(req,res,next){
      var headers={

          };
      console.log(req.query.id, "url")
      var query = req.query.id;
        request.get(config.API_DOMAIN+'lab/getLab?id='+query)
                .headers(headers)
                .end(function (response) {
                  console.log(response.status);
                  if(response.status == 200){
                    res.send(response.body);
                  }else{
                    res.send({})
                  }
                });
  }
};