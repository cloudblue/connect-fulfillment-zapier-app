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

describe('Connect Fulfillment Zapier App - Fill Fulfillment Parameters (with Line Items support)', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a request with fulfillment parameter filled', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        request_id: 'PR-0000-0000-0000-000',
        params: [
          {
            id: 'param_a',
            value: 'parameter content'
          }
        ],
        note: 'note'
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'updateRequestParameters')
      .withArgs(bundle.inputData.request_id, bundle.inputData.params, bundle.inputData.note)
      .returns(responses.creates.fill_fulfillment_params);
    // Call to zapier function to test
    appTester(App.creates.fill_fulfillment_params_lis.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.should.have.property('note').eql('note');
        results.should.have.property('asset');
        results.asset.should.have.property('params');
        results.asset.params.should.be.an.Array();
        results.asset.params.should.have.size(1);
        results.asset.params[0].should.have.property('id').eql('param_a');
        results.asset.params[0].should.have.property('value').eql('parameter content');
        done();
      })
      .catch(done);
  });
});
