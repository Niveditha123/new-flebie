var compression = require("compression");
var express = require("express");
var config 	= require("./config/index.js");
var setup 	= require("./setup/index.js");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require('path');
var crypto = require('crypto');
var node_cryptojs = require('node-cryptojs-aes');

var app = express();
app.use("/public/",express.static(__dirname + '/public'));
app.use(compression({filter: shouldCompress}));
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


setup(app);

/*app.listen(config.PORT,function(){
	console.log("App listening on port "+config.PORT);
});*/

require('https').createServer({
	key: fs.readFileSync('certs/files.flebie.key'),
	cert: fs.readFileSync('certs/7f2d4718b1db9ceb.crt'),
	ca: [fs.readFileSync('certs/gd_bundle-g2-g1.crt')] // <----- note this part
}, app).listen(443);