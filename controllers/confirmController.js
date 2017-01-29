var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("confirm");
  },
  processPayment:function(req,res,next){
    var paymentResp = req.body;
    console.log(paymentResp);
  }
};