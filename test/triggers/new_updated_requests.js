/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

/* globals describe it */
const should = require('should');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');


describe('Connect Fulfillment Zapier App - New and Updated Requests', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of requests with original id', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: ['pending', 'inquiring']
      }
    };
    sandbox.stub(Fulfillment.prototype, 'searchRequests').returns(responses.triggers.new_requests);
    appTester(App.triggers.new_updated_requests.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        results[0].should.have.property('request_id');
        results[0].should.have.property('id');
        results[0].id.should.not.be.eql(results[0].original_id);
        results.should.have.size(19);
        done();
      })
      .catch(done);
  });
});
