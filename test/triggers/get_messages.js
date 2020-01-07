/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const { ConversationResource } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Create Message Conversation Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a payload of the request modified', (done) => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        id: 'PR-5426-9883-2189-001',
        text: 'This note'
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(ConversationResource.prototype, 'getConversationsByObjectId').returns(responses.triggers.conversations);
    sandbox.stub(ConversationResource.prototype, 'get')
      .withArgs('CO-631-920-118')
      .returns(responses.triggers.get_messages);
    // Call to zapier function to test
    appTester(App.triggers.get_messages.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        done();
      })
      .catch(done);
  });
});
