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
const httpsOptions = {
	//cert: fs.readFileSync(path.join(__dirname, 'ssl','server.crt')),
	//key:  fs.readFileSync(path.join(__dirname, 'ssl','server.key'))
	//cert: fs.readFileSync(config.CERT_PATH),
	//key:  fs.readFileSync(config.KEY_PATH) 
	//cert: fs.readFileSync('/home/ubuntu/csr_keys/server.crt'),
	key:  fs.readFileSync(path.join(__dirname, 'ssl','custom.key')),
	cert: fs.readFileSync(path.join(__dirname, 'ssl','b39dc3a8428cdd1d.crt')),
	ca:  fs.readFileSync(path.join(__dirname, 'ssl','gd_bundle-g2-g1.crt'))
};
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
	//console.log("Request headers are: "+JSON.stringify(req.headers));
	//console.log("Request headers are: "+req.secure);
	if(!req.secure) {
		//res.redirect('https://' + req.get('host') + req.url);
		next();
	}
	else {
		next();
	}
	/*if(!req.secure) {
		return res.redirect(['https://', 'localhost:'+config.PORT, req.url].join(''));
	}*/
	
	
});
setup(app);
//HTTPS server
https.createServer(httpsOptions,app)
	.listen(8082,function(){
		console.log("App listening on port "+8082);
	});

//HTTP server
http.createServer(app)
	.listen(config.PORT,function(){
		console.log("App listening on port "+config.PORT);
	});


/*app.listen(config.PORT,function(){
	console.log("App listening on port "+config.PORT);
});*/

