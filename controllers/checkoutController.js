var request =  require('request');
module.exports = {
  renderPage:function(req,res,next){
    res.render("checkout");
  },
};