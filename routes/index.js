var express = require("express");
var Mailgun = require('mailgun-js');
var config 	= require("../config/index.js");
var indexController = require("../controllers/indexController");
var searchController = require("../controllers/searchController");
var checkoutController = require("../controllers/checkoutController");
var testListController = require("../controllers/testListController");
var mailController = require("../controllers/mailController");
var populartestsController = require("../controllers/populartestsController");
var popularlabsController = require("../controllers/popularlabsController");
var popularpackagesController = require("../controllers/popularpackagesController");
var confirmController = require("../controllers/confirmController");
var listlabsfortestController = require('../controllers/listlabsfortestController');
var dashboardController = require("../controllers/dashboardController.js");
var otherPageController = require("../controllers/otherpagesController.js");
var userController = require("../controllers/userController.js");
var editOrderController = require("../controllers/editOrderController.js");
var orderSummaryController = require("../controllers/orderSummaryController.js");
 
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
  router.get('/paymentResponse',confirmController.renderPage);
  router.post('/paymentresponse',confirmController.processPayment);

    router.get('/editOrder', editOrderController.renderPage);
  router.get('/orderSummaryPage',orderSummaryController.renderPage);

  //paymentresponse
  router.get('/listlabsfortest',listlabsfortestController.renderPage);
    router.get('/aboutus',otherPageController.aboutus);
  router.get('/faqs',otherPageController.faqs);
  router.get('/terms&condition',otherPageController.terms);
   router.get('/privacypolicy',otherPageController.privacypolicy);
   router.get('/refundsandcancellation',otherPageController.refundsandcancellation);
  //router.get('/multisearchlabs', searchController.renderPage);


  //apis
  router.get('/getList',indexController.getList);
  router.get('/getLabTestsFromTestNames',searchController.getLabTestsFromTestNames);
  router.get('/getLabTestsFromLabId',testListController.getLabTestsFromLabId);
  router.get('/getLab',testListController.getLab);
  router.get("/getAvailableSlots",checkoutController.getAvailableSlots);
  router.post("/createOrder",checkoutController.createOrder);
  router.post("/setTimeSlot",checkoutController.setTimeSlot);
  router.get("/applyOffer",checkoutController.applyOffer);
  router.get("/removeOffer",checkoutController.removeOffer);
  router.get("/getLabs",popularlabsController.getLabs);
   router.get("/getPopTests",populartestsController.getPopTest);
   router.get("/getOrder",confirmController.getOrder);
   router.put("/updateTransaction",checkoutController.updateTransaction);
   router.get('/getPopPackages',popularpackagesController.getPopPackages);
    router.get("/getOrderSummary",confirmController.getOrder);
    router.get('/orderSummaryEmail', mailController.sendOrderSummaryEmail);
  //getPopTest


  //user apis
router.post("/signIn",userController.signIn);
  return router;
};
