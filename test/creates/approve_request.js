/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const getConnectClient = require('../../lib/utils').getConnectClient;
const HttpError = require('@cloudblueconnect/connect-javascript-sdk').HttpError;
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Approve Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a Request with status "approved"', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        id: 'PR-0000-0000-0000-000',
        template_id: 'TL-000-000-000',
      }
    };

    sandbox.stub(getConnectClient({request: null}, bundle).requests, 'approveWithTemplate').returns(responses.creates.approve_request);
    appTester(App.creates.approve_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.should.have.property('id').eql('PR-0000-0000-0000-000');
        results.should.have.property('status').eql('approved');
        done();
      })
      .catch(done);
  });
});
