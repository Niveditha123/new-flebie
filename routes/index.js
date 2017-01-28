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
var dashboardController = require("../controllers/dashboardController.js");
var otherPageController = require("../controllers/otherPagesController.js");
 
module.exports = function() {

  var router = express.Router();


  router.get('/', indexController.renderPage);
  router.get('/getMultiLabs',indexController.getMultiLabs);
  router.get('/populartests',populartestsController.renderPage);
    router.get('/popularlabs',popularlabsController.renderPage);
    router.get('/popularpackages',popularpackagesController.renderPage);
    router.get('/dashboard',dashboardController.renderPage);

  router.get('/multisearchlabs', searchController.renderPage);
  router.get('/checkout', checkoutController.renderPage);
  router.get('/test/list', testListController.renderPage);
  router.get('/paymentresponse',confirmController.renderPage);
  router.get('/listlabsfortest',listlabsfortestController.renderPage);
    router.get('/aboutus',otherPageController.aboutus);
  //router.get('/multisearchlabs', searchController.renderPage);


  //apis
  router.get('/getList',indexController.getList);
  router.get('/getLabTestsFromTestNames',searchController.getLabTestsFromTestNames);
  router.get('/getLabTestsFromLabId',testListController.getLabTestsFromLabId);
  router.get('/getLab',testListController.getLab);
  router.get("/getAvailableSlots",checkoutController.getAvailableSlots);
  router.post("/createOrder",checkoutController.createOrder);
  router.get("/getLabs",popularlabsController.getLabs)


  return router;
}
