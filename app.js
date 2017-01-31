var compression = require("compression");
var express = require("express");
var config 	= require("./config/index.js");
var setup 	= require("./setup/index.js");
var bodyParser = require("body-parser");
var path = require('path');


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

app.listen(config.PORT,function(){
	console.log("App listening on port "+config.PORT);
});
