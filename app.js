var compression = require("compression");
var fs = require("fs");
var express = require("express");
var https = require("https");
var http = require("http");
var config 	= require("./config/index.js");
var setup 	= require("./setup/index.js");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var path = require('path');
/*const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, 'ssl','server-key.pem')), 
    cert: fs.readFileSync(path.join(__dirname, 'ssl','server-crt.pem')), 
    ca: [ fs.readFileSync(path.join(__dirname, 'ssl', 'gd_bundle-g2-g1.crt'))]
};*/
var app = express();
app.use("/public/",express.static(__dirname + '/public'));
app.use(compression({filter: shouldCompress}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
function shouldCompress (req, res) {
	if (req.headers['x-no-compression']) {
		// don't compress responses with this request header
		return false;
	}

	// fallback to standard filter function
	return compression.filter(req, res);
}

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
var isProduction = process.env.NODE_ENV === 'production';

//redirect from http to https
app.use(function(req, res, next) {
	//console.log("Port is: "+req.get('host').split(":"));
	if(req.get('host').split(":")!= null && req.get('host').split(":")[1]!= config.PORT)
	{
		//res.redirect("https://www.flebie.com");
	}
	else
	{
		
	}
	next();
	
});
setup(app);
//HTTPS server
/*https.createServer(httpsOptions,app)
	.listen(8082,function(){
		console.log("App listening on port "+8082);
	});*/

//HTTP server
http.createServer(app)
	.listen(config.PORT,function(){
		console.log("App listening on port "+config.PORT);
	});
http.createServer(app)
	.listen(8082,function(){
		console.log("App listening on port "+8082);
	});

/*app.listen(config.PORT,function(){
	console.log("App listening on port "+config.PORT);
});*/

