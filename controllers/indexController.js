var request =  require('unirest');
var userController = require('../controllers/userController.js');
module.exports = {
     
    
    
  renderPage:function(req,res,next){
      console.log("ums cookie is: "+req.cookies.ums);
      var user = null;
      var labId = null;
      if(req.cookies.ums != null)
      {
          if(req.cookies.role == "LABADMIN")
          {
              labId = userController.decrypt(req.cookies.labId);
              res.redirect("/dashboard?labId="+labId);
          }
          else if(req.cookies.role == "ADMIN")
          {
              labId = userController.decrypt(req.cookies.labId);
              res.render("index");
          }
          else {
              res.render("index");
          }
          /*console.log("Trying to get user"+req.cookies.ums);
          user = getUserUsingSessionKey(req.cookies.ums, user);
          
          
          console.log("got user: "+user);
          
          setInterval(function(){ console.log("Loading");
              console.log("Retrieved User is: "+JSON.stringify(user));
              if(user != null && user["role"] != "User")
              {
                  
                  res.render("dashboard");
              }
              else {
                  res.render("index");
              }
          }, 10);*/
          

      }
      else {
          var value = {
      title: "Dashboard",
    prop1:"value1"};
    var prop = JSON.stringify(value);
          res.render("index",{data:prop});
      }
    
  },
  getMultiLabs:function(req,res,next){
   
    res.json(data);
  },
  getList:function(req,res,next){
    var headers={

    };

 request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests')
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

var getUserUsingSessionKey = function(sessionKey, user){
    var headers={

    };
    
    request.put('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/user/getUserUsingSessionKey')
        .headers(headers)
        .send({"sessionKey": sessionKey})
        .end(function (response) {
            console.log(response.status);
            if(response.status == 200){
                console.log("Response is: "+response.status+" and body is: "+JSON.stringify(response.body));
                user = response.body;
            }else{
                user = {};
            }
            
        });
};