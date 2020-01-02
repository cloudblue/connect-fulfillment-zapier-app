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

describe('Connect Fulfillment Zapier App - Inquire Tier Config Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should change status to "inquire" and return an empty object', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        request_id: 'TCR-000-000-000-000',
        notes: 'Notes',
        params: {'param_a': 'error_a'}
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'inquireTierConfigRequest')
      .withArgs(bundle.inputData.request_id, [{id: 'param_a', value_error: 'error_a'}], bundle.inputData.notes)
      .returns(undefined);
    // Call to zapier function to test
    appTester(App.creates.inquire_tier_config_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object().and.be.empty();
        done();
      })
      .catch(done);
  });
});
