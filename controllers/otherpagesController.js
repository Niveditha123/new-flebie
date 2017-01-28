var request =  require('request');
module.exports = {
  aboutus:function(req,res,next){
    res.render("aboutus");
  },
  faqs:function(req,res,next){
    res.render("faqs");
  },
  terms:function(req,res,next){
    res.render("terms");
  },
  privacypolicy:function(req,res,next){
    res.render("privacypolicy");
  },
  refundsandcancellation:function(req,res,next){
    res.render("refundsandcancellation");
  }
};