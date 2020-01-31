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

describe('Connect Fulfillment Zapier App - Inquire Request (with line items support)', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should change status to "inquire" and return the modified request', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        request_id: 'PR-5426-PR-5426-9883-2189-001',
        template_id: 'TL-827-840-476',
        params: [
          {
            id: 'param_a',
            value_error: 'error_a'
          }
        ]
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'inquireRequestWithTemplate')
      .withArgs(bundle.inputData.request_id, bundle.inputData.template_id, bundle.inputData.params, bundle.inputData.note)
      .returns(responses.creates.inquire_request);
    // Call to zapier function to test
    appTester(App.creates.inquire_request_lis.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.status.should.be.eql('inquiring');
        done();
      })
      .catch(done);
  });
  it('should change status to "inquire" and return the modified request (without template)', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        request_id: 'PR-5426-PR-5426-9883-2189-001',
        params: [{id: 'param_a', value_error: 'error_a'}]
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'inquireRequest')
      .withArgs(bundle.inputData.request_id, {}, bundle.inputData.params, bundle.inputData.note)
      .returns(responses.creates.inquire_request);
    // Call to zapier function to test
    appTester(App.creates.inquire_request_lis.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.status.should.be.eql('inquiring');
        done();
      })
      .catch(done);
  });
});
