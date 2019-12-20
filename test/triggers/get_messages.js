/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const { ConversationService } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Get Messages Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a messages from the conversation', done => {
    const bundle = {
      authData: {
        //api_key: process.env.CONNECT_API_KEY,
        //endpoint: process.env.CONNECT_ENDPOINT
        api_key: 'ApiKey SU-195-824-670:239e211039b9cf5fcb407a75649af97acec8ab01',
        endpoint: 'https://api.cnct.tech/public/v1'
      },
      inputData: {
        id: 'PR-3767-7014-3540-001'
        // id: 'CO-932-575-730'
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(ConversationService.prototype, 'getConversation').returns(responses.triggers.get_messages);
    // Call to zapier function to test
    appTester(App.triggers.get_messages.operation.perform, bundle)
      .then(results => {
        // results.should.be.an.Object();
        done();
      })
      .catch(done);

  });
});
