var express = require("express");
var router 	= require("../routes/index.js");
var hoffman = require('hoffman');
var path 	= require('path');

module.exports = function(app){




	hoffman.dust.config.whitespace = true;


	app.set('views', 'views');
	app.set('view engine', 'dust');
	app.engine('dust', hoffman.__express());
	app.use(hoffman.stream);
	//app.use("/public/",express.static(__dirname + '/public'));



	app.use("/",router());

}