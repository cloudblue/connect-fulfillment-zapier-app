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


describe('Connect Fulfillment Zapier App - New Tier Config Requests', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of tier config requests filtered by status', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: ['pending', 'inquiring']
      }
    };
    sandbox.stub(Fulfillment.prototype, 'listTierConfigRequests')
      .withArgs({ type: undefined,
        status: [ 'pending', 'inquiring' ],
        id: undefined,
        configurationId: undefined,
        configurationTierLevel: undefined,
        configurationAccountId: undefined,
        configurationProductId: undefined,
        configurationAccountExternalUID: undefined,
        assigneeId: undefined,
        unassigned: undefined }, '-created', 100, 0)
      .returns(responses.triggers.new_tier_config_requests);
    appTester(App.triggers.new_tier_config_requests.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
  it('should return a list of tier config requests filtered by status (single page)', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: ['pending', 'inquiring'],
        process_in_batch: true,
      }
    };
    sandbox.stub(Fulfillment.prototype, 'listTierConfigRequests')
      .withArgs({ type: undefined,
        status: [ 'pending', 'inquiring' ],
        id: undefined,
        configurationId: undefined,
        configurationTierLevel: undefined,
        configurationAccountId: undefined,
        configurationProductId: undefined,
        configurationAccountExternalUID: undefined,
        assigneeId: undefined,
        unassigned: undefined }, '-created', 100, 0)
      .returns(responses.triggers.new_tier_config_requests);
    appTester(App.triggers.new_tier_config_requests.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
//   it('should return a list of requests filtered by status (single page)', done => {
//     const bundle = {
//       authData: {
//         api_key: process.env.CONNECT_API_KEY,
//         endpoint: process.env.CONNECT_ENDPOINT
//       },
//       inputData: {
//         status: ['pending', 'inquiring'],
//         process_in_batch: true,
//       }
//     };
//     sandbox.stub(Fulfillment.prototype, 'listRequests').returns(responses.triggers.new_requests);
//     appTester(App.triggers.new_requests.operation.perform, bundle)
//       .then(results => {
//         results.should.be.an.Array();
//         done();
//       })
//       .catch(done);
//   });
});
