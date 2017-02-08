var request =  require('unirest');

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
            "isActive": 1,
            "username": req.body.username,
            "password":req.body.password,
            "company": "asasI14",
            "role": "LABADMIN"
        };
        var text = payLoad.username+":"+payLoad.password;

        var ebc = encrypt(text);
        console.log("Encrypted string is: "+ebc);
        var dbc = decrypt(ebc);
        payLoad.accessKey=ebc;
        request.put('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/user/loginWithCredentials')
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'})
            .send(payLoad)
            .end(function (response) {
                console.log(response.body,"payment COD");
                if(response.body){
                    res.cookie('ums',response.body.sessionKey);
                    res.cookie('role',encrypt(response.body.role));
                    res.cookie('username',encrypt(response.body.username));
                    res.cookie('company',encrypt(response.body.company));
                    var userDetails =response.body.userDetails;
                    if(userDetails){
res.cookie('labId',encrypt(response.body.userDetails.labId.toString()));
                    res.send({"role":response.body.role,"labId": response.body.userDetails.labId.toString()});
                    }
                    
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
            var company = null;
            var username = null;
            var user = {};
            if(req.cookies.ums != null)
            {
                role = decrypt(req.cookies.role);
                user.role = role;
                if(req.cookies.labId != null )
                {
                    labId = decrypt(req.cookies.labId);
                    user.labId = labId;
                }
                company = decrypt(req.cookies.company);
                username = decrypt(req.cookies.username);
                user.company = company;
                user.username = username;
            }
            else {
                user.role = "USER";
            }
            
            console.log("Current user is: "+user);
            res.send(user);
    }
    

};