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

describe('Connect Fulfillment Zapier App - Approve Tier Config Request', () => {
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
        id: 'TCR-000-000-000-000',
        template_id: 'TL-000-000-000',
      }
    };

    sandbox.stub(Fulfillment.prototype, 'approveTierConfigRequestWithTemplate').returns(responses.creates.approve_tier_config_request);
    appTester(App.creates.approve_tier_config_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        results.should.have.property('template');
        results.template.should.have.property('id').eql('TL-000-000-000')
        results.template.should.have.property('representation');
        done();
      })
      .catch(done);
  });
});
