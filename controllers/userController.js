var request =  require('unirest');
var config 	= require("../config/index.js");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'TheBestSecretKey';


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {

    signIn:function(req,res,next){

        var headers={

        };
        console.log(req.body);
        var payLoad={
            "username": req.body.username,
            "password":req.body.password
        };
        var text = payLoad.username+":"+payLoad.password;

        var ebc = encrypt(text);
        console.log("Encrypted string is: "+ebc);
        var dbc = decrypt(ebc);
        payLoad.accessKey=ebc;
        request.put(config.API_DOMAIN+'user/loginWithCredentials')
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'})
            .send(payLoad)
            .end(function (response) {
                console.log(response.body);
                if(response.body != null && (response.status == 200)){
                    res.cookie('ums',response.body.sessionKey);
                    res.cookie('role',encrypt(response.body.role));
                    res.cookie('username',encrypt(response.body.username));
                    res.cookie('company',encrypt(response.body.company));
                    res.cookie('userId',encrypt(response.body.userId.toString()));
                    var userDetails =response.body.userDetails;
                    if((userDetails != null) &&  (response.body.userDetails.labId != null)){
                    res.cookie('labId',encrypt(response.body.userDetails.labId.toString()));
                    
                    }
                    res.send({"role":response.body.role});
                    
                }
                else {
                    
                }
            });
    },
    getFlebies:function(req,res,next){

        var headers={
            'Authorization': req.cookies.ums
            
        };
        
        request.get(config.API_DOMAIN+'user/getUsersUsingRoleAndCompany?role=FLEBIE&company=Flebie')
            .headers(headers)
            
            .end(function (response) {
                console.log(response.body);
                if(response.body != null && (response.status == 200)){
                    
                    res.send(response.body);

                }
            });
    },

    encrypt: function (text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
},

 decrypt: function(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
},
    
    getCurrentUser: function(req,res,next){
            var sessionKey = null;
            var role = null; 
            var labId = null;
            var userId = null;
            var company = null;
            var username = null;
            var user = {};
            console.log("user get current");
            if(req.cookies.ums != null)
            {
                role = decrypt(req.cookies.role);
                console.log(role,"role");
                user.role = role;
                if(req.cookies.labId != null )
                {
                    labId = decrypt(req.cookies.labId);
                    user.labId = labId;
                }
                company = decrypt(req.cookies.company);
                username = decrypt(req.cookies.username);
                userId = decrypt(req.cookies.userId);
                user.company = company;
                user.username = username;
                user.userId = userId;
            }
            else {
                user.role = "USER";
            }
            
            console.log("Current user is: "+user);
            res.send(user);
    }
    

};