var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("index");
  },
  getMultiLabs:function(req,res,next){
   
    res.json(data);
  },
  getList:function(req,res,next){
    var headers={

    };

 request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests')
        .headers(headers)
        .end(function (response) {
          console.log(response.status);
          if(response.status == 200){
            res.send(response.body);
          }else{
            res.send([])
          }
        });
  }
};
