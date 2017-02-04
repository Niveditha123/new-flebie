var request =  require('unirest');
module.exports = {
     
    
    
  renderPage:function(req,res,next){
      console.log("ums cookie is: "+req.cookies.ums);
      var user = null;
      if(req.cookies.ums != null)
      {
          res.render("dashboard");
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
          res.render("index");
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
    
    request.put('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/user/getUserUsingSessionKey')
        .headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'})
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