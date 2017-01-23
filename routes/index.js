var express = require("express");
var indexController = require("../controllers/indexController");
var searchController = require("../controllers/searchController");
var checkoutController = require("../controllers/checkoutController");
var testListController = require("../controllers/testListController");

var populartestsController = require("../controllers/populartestsController");
var popularlabsController = require("../controllers/popularlabsController");
var popularpackagesController = require("../controllers/popularpackagesController");
var confirmController = require("../controllers/confirmController");
var listlabsfortestController = require('../controllers/listlabsfortestController');
 
module.exports = function() {

  var router = express.Router();
//apis
  router.get('/getList',indexController.getList);
  router.get('/getLabTestsFromTestNames',searchController.getLabTestsFromTestNames);
  router.get('/getLabTestsFromLabId',testListController.getLabTestsFromLabId)

  router.get('/', indexController.renderPage);
  router.get('/getMultiLabs',indexController.getMultiLabs);
  router.get('/populartests',populartestsController.renderPage);
    router.get('/popularlabs',popularlabsController.renderPage);
    router.get('/popularpackages',popularpackagesController.renderPage);

  router.get('/multisearchlabs', searchController.renderPage);
  router.get('/checkout', checkoutController.renderPage);
  router.get('/test/list', testListController.renderPage);
  router.get('/paymentresponse',confirmController.renderPage);
  router.get('/listlabsfortest',listlabsfortestController.renderPage);
  //router.get('/multisearchlabs', searchController.renderPage);


  return router;
}
