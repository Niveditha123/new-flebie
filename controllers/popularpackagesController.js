var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("popularpackages");
  },
  getPopPackages:function(req,res,next){
    var headers={

    };
      request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/package/getAllPackages')
          .headers(headers)
          .end(function (response) {
            console.log(response.body,"popular packages");
            if(response.status == 200){
              res.send(response.body);
            }else{
              res.send([])
            }
          });
  }
};