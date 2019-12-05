/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const getConnectClient = require('../../lib/utils').getConnectClient;
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Inquire Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a payload of the rejected request', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        id: 'PR-5426-PR-5426-9883-2189-001',
        reason: 'Not available',
        templateId: 'TL-827-840-476',
        params: {'param_a': 'Not valid'}
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(getConnectClient({request: null}, bundle).requests, 'inquireRequest').returns(responses.creates.inquire_request);
    // Call to zapier function to test
    appTester(App.creates.inquire_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.status.should.be.eql('inquiring');
        done();
      })
      .catch(done);
  });
});