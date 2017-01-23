var request =  require('unirest');
module.exports = {
  renderPage:function(req,res,next){
    res.render("testlist");
  },
  getLabTestsFromLabId:function(req,res,next){
            var headers={

                };
            console.log(req.query.labId, "url")
            var query = req.query.labId;
              request.get('http://flebie.ap-south-1.elasticbeanstalk.com/api/v0.1/labTest/getLabTestsFromLabId?labId='+query)
                      .headers(headers)
                      .end(function (response) {
                        console.log(response.status);
                        if(response.status == 200){
                          res.send(response.body);
                        }else{
                          res.send({})
                        }
                      });
  }
};