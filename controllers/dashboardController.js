var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    console.log(req.cookies.ums)
    res.render("dashboard");
  }
};