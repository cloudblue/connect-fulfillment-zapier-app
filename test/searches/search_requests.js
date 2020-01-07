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
const BaseResource = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api/base');
const { RequestResource } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');


describe('Connect Fulfillment Zapier App - Search Requests', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of requests filtered by status', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: ['pending', 'inquiring']
      }
    };
    sandbox.stub(Fulfillment.prototype, 'listRequests').returns(responses.triggers.new_requests);
    appTester(App.searches.search_requests.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
  it('should return a list of requests filtered by status (single page)', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: 'pending',

        process_in_batch: true,
      }
    };
    const spy = sandbox.spy(RequestResource.prototype, 'addQuery');
    // console.log(spy);
    const stub = sandbox.stub(BaseResource.prototype, 'fetch').returns({
      json: () => Promise.resolve(responses.triggers.new_requests) 
    });
    appTester(App.searches.search_requests.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
