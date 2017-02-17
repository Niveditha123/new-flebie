var request =  require('unirest');
var userController = require('../controllers/userController.js');
module.exports = {
  renderPage:function(req,res,next){
    console.log(req.cookies.ums);
    var role = null;
    if(req.cookies.role != null)
    {
      role = userController.decrypt(req.cookies.role);
      if(role == "LABADMIN"|| role=="ADMIN" || role=="FLEBIE")
      {
        res.render("dashboard");
      }
    }
    
    else 
    {
      res.render("index");
    }
    
  },
  getOrdersBetweenDates:function(req,res,next){
    var headers={

    };
    var statuses = req.query.statuses;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    
    console.log(statuses+"-"+startDate+"-"+endDate);
    request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses='+statuses+'&startDate='+startDate+'&endDate='+endDate+'&orderOriginPerson=2')
        .headers(
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': req.cookies.ums
            }
        )
        .end(function (response) {
          console.log(response.status);
          if(response.status == 200){
            console.log(response.body,"orders");
            res.send(response.body);
          }else{
            res.send({})
          }
        });
  }
};