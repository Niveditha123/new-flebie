var request =  require('unirest');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("popularlabs");
  },
  getLabs:function(req,res,next){
    var headers={

    };

  request.get(config.API_DOMAIN+'lab/getLabs')
          .headers(headers)
          .end(function (response) {
            console.log(response.status);
            var popularLabs=[];
            if(response.status == 200){
              if(Array.isArray(response.body)){
                  for(var i=0;i<response.body.length;i++){
                    if(response.body[i].isPopular){
                      popularLabs.push(response.body[i]);
                    }
                  }
              }
              res.send(popularLabs);
            }else{
              res.send([])
            }
          });
    }
};