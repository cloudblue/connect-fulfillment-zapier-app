const authentication = require('./lib/authentication');
const Request = require('./lib/resources/request');
const Product = require('./lib/resources/product');
const RejectRequest = require('./lib/creates/reject-request');
const middleware = require('./lib/middleware');


// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication.authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [],
  afterResponse: [],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
    [Product.key]: Product,
    [Request.key]: Request
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [RejectRequest.key]: RejectRequest
  }
};

// Finally, export the app.
module.exports = App;
