var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("confirm");
  },
  processPayment:function(req,res,next){
    res.render("confirm");
  },
  getOrder:function(req,res,next){


  var headers={

    };
    var query = req.query.id;

  request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/getOrder?id='+query)
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
    }
};