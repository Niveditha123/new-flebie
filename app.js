var express = require("express");
var config 	= require("./config/index.js");
var setup 	= require("./setup/index.js");


var app = express();
	app.use("/public/",express.static(__dirname + '/public'));


setup(app);





app.listen(config.PORT,function(){
	console.log("App listening on port "+config.PORT);
})