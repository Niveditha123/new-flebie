var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("checkout");
  },
  getAvailableSlots:function(req,res,next){

      var headers={

    };
var query = req.query.slotDate;
console.log(query);
  request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/timeSlot/getAvailableSlots?slotDate='+query)
          .headers(headers)
          .end(function (response) {
            console.log(response.status);
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send([])
            }
          });
  },
  createOrder:function(req,res,next){
    console.log(req.body);
    request.post('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/createOrder')
      .headers({
        'Accept': 'application/json', 
        'Content-Type': 'application/json'})
      .send(req.body)
      .end(function (response) {
        console.log(response.body);
        res.send(response.body)
      });
  }

};