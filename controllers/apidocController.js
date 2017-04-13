var request =  require('unirest');
var path    = require("path");
var userController = require('../controllers/userController.js');
var config 	= require("../config/index.js");
module.exports = {
    getapidoc:function(req,res,next){
        console.log("Entered here");
        console.log(req.cookies.ums);
        var role = null;
        if(req.cookies.role != null)
        {
            role = userController.decrypt(req.cookies.role);
            if(role=="ADMIN")
            {
                console.log("Path is: "+path.join(__dirname+'/../apidoc/index.html'));
                res.sendFile(path.join(__dirname+'/../apidoc/index.html'));
            }
            else {
                res.redirect("/");
            }
        }

        else
        {
            res.redirect("/");
        }

    }
};