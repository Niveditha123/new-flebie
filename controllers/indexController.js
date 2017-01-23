var request =  require('request');
module.exports = {
  renderPage:function(req,res,next){
    res.render("index");
  },
  getMultiLabs:function(req,res,next){
   
    res.json(data);
  },
  getList:function(req,res,next){
    request({
        method:"GET",
        url:"http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/test/getAllTests",
        headers:[{
          "Access-Control-Allow-Origin":"*" 
        }]
    })
        .on('response', function(response) {
    console.log(response,"res") // 200
    res.json(response)
  })
  .on('error', function(err) {
    res.json(err)
  })
  }
};
