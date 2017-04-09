var request =  require('request');
var config 	= require("../config/index.js");
module.exports = {
  renderPage:function(req,res,next){
    res.render("listlabsfortest");
  },
};