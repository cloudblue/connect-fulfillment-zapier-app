/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

const authentication = require('./lib/authentication');
const middleware = require('./lib/middleware');


const creates = require('./lib/creates');
const triggers = require('./lib/triggers');
const searches = require('./lib/searches');


const platformVersion = zapier.version;
const { version } = require('./package.json');

const App = {
  version,
  platformVersion,
  authentication: authentication.authentication,
  beforeRequest: [middleware.addTaskIdToHeader],
  afterResponse: [],
  resources: {},
  triggers,
  searches,
  creates,
};

module.exports = App;
