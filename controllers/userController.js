var request =  require('unirest');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'TheBestSecretKey';


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
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
  //"accessKey": "VOBXC2COBXcN4bl01iyxfUmAoXbL9FTKibMR+svYow0=",
  "company": "asasI14",
  "role": "LABADMIN"
}
var text = payLoad.username+":"+payLoad.password;
var ebc = encrypt(text);
var dbc = decrypt(ebc);
payLoad.accessKey=ebc;
request.put('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/user/loginAsUser')
        .headers({
          'Accept': 'application/json', 
          'Content-Type': 'application/json'})
        .send(payLoad)
        .end(function (response) {
          console.log(response.body,"payment COD");
          if(response.body){
            res.cookie('ums',response.body.accessKey);
            res.send({"ums":response.body.accessKey})
          }
        });
  }

};