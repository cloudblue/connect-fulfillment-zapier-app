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

describe('Connect Fulfillment Zapier App - Change Note Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a payload of the request modified', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        id: 'PR-5426-PR-5426-9883-2189-001',
        note: 'This note'
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(Fulfillment.prototype, 'updateRequest').returns(responses.creates.note_request);
    // Call to zapier function to test
    appTester(App.creates.note_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.note.should.be.eql('This note');
        done();
      })
      .catch(done);
  });
});
