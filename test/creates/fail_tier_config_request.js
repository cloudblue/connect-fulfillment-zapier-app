/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Reject Tier Config Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a 204', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        request_id: 'TCR-000-000-000-000',
        reason: 'Not available'
      }
    };
    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'failTierConfigRequest')
      .withArgs('TCR-000-000-000-000', 'TCR-000-000-000-000')
      .returns(undefined);
    // Call to zapier function to test
    appTester(App.creates.fail_tier_config_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.empty();
        done();
      })
      .catch(done);
  });
});
