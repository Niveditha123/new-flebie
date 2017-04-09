var request =  require('unirest');
var userController = require('../controllers/userController.js');
var config 	= require("../config/index.js");
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
      res.redirect("/");
    }
    
  },
  getOrdersBetweenDates:function(req,res,next){
    var headers={

    };
    var statuses = req.query.statuses;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    
    console.log(statuses+"-"+startDate+"-"+endDate);
    request.get(config.API_DOMAIN+'order/getOrdersBetweenDates?startPosition=0&maxResult=10&statuses='+statuses+'&startDate='+startDate+'&endDate='+endDate+'&orderOriginPerson=2')
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