/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

/* globals describe it */
const should = require('should');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const { HubResource } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');


describe('Connect Fulfillment Zapier App - List hubs', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of hubs', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {}
    };
    sandbox.stub(HubResource.prototype, 'search').returns(responses.triggers.hubs);
    appTester(App.triggers.hubs.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
