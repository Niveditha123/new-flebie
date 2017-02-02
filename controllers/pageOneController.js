var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("pageOne");
  }
};