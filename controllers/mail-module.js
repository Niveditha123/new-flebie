/**
 * Sample Mailgun Module
 */

import request from "unirest";

(function() {

  var url = 'api.mailgun.net/v2';
  var domain = 'sandbox87a8e5296071469980b2de3dc775fbad.mailgun.org';
  var key = 'key-0e0b6a3c720b1958693332a81e102762';

  module.exports = {
    /**
     * Get the version of the module.
     * @return {String}
     */
    version: '1.0.0',

    /**
     * Initialize the Mailgun module with the proper credentials.
     * @param {String} domainName Your Mailgun domain name
     * @param {String} apiKey Your Mailgun api key
     */
    initialize: function(domainName, apiKey) {
      domain = domainName;
      key = apiKey;
      return this;
    },
    sendEmail: function(params, options) {
      /*return request({
        method: "POST",
        url: "https://api:" + key + "@" + url + "/" + domain + "/messages",
        body: params,
      }).then(function(httpResponse) {
        if (options && options.success) {
          options.success(httpResponse);
        }
      }, function(httpResponse) {
        if (options && options.error) {
          options.error(httpResponse);
        }
      });*/

      request.post("https://api:" + key + "@" + url + "/" + domain + "/messages")
      .headers()
      .send(params)
      .end(function (response) {
        conole.log(response,"mail gun")
      });
    }

  }
}());
