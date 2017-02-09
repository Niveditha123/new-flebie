var request =  require('unirest');


module.exports = {
  renderPage:function(req,res,next){
            var data ={
              userPtype:2
            }
            var data = JSON.stringify(data);
            res.render("checkout",{pageData:data});
  },
  getAvailableSlots:function(req,res,next){

      var headers={

    };
      
      var query = req.query.slotDate;
console.log(query);
  request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/timeSlot/getAvailableSlots?slotDate='+query)
          .headers(headers)
          .end(function (response) {
            
            console.log(response.body,"timeslot");
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send([])
            }
          });
  },
  createOrder:function(req,res,next){
    console.log(req.body);
      console.log("Session key is: "+req.cookies.sessionKey);
    request.post('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/createOrder')
      .headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
          'Authorization': req.cookies.ums
      })
      .send(req.body)
      .end(function (response) {
        console.log(response.body,"order");
        res.send(response.body)
      });
  },
  setTimeSlot:function(req,res,next){
    console.log(req.body);
    request.post('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/timeSlot/setTimeSlot')
      .headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json'})
      .send(req.body)
      .end(function (response) {
        console.log(response.body,"set timeslot");
        res.send(response.body)
      });
  },
  applyOffer:function(req,res,next){

      var headers={

    };
var code = req.query.promoCode;
var orderId = req.query.orderId;
console.log(code,orderId," applyoffer");
  request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/promotion/applyPromotionCode?promoCode='+code+'&orderId='+orderId)
          .headers(headers)
          .end(function (response) {
            console.log(response.body,"promo");
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send({})
            }
          });
  },
  removeOffer:function(req,res,next){

      var headers={

    };
var orderId = req.query.orderId;
console.log(orderId,"remove");
  request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/promotion/ignorePromotionCode?orderId='+orderId)
          .headers(headers)
          .end(function (response) {
            console.log(response.body,"promo removed");
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send({})
            }
          });
  },
    updateTransaction:function(req,res,next){
      console.log(req.body);
      request.put('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/transaction/updateTransaction')
        .headers({
          'Accept': 'application/json', 
          'Content-Type': 'application/json'})
        .send(req.body)
        .end(function (response) {
          console.log(response.body,"payment COD");
          res.send(response.body)
        });
      
    }


};