/* globals describe it */
const should = require('should');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const { Inventory } = require('@cloudblueconnect/connect-javascript-sdk');
// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');

describe('Connect Fulfillment Zapier App - Fulfillment parameters', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of parameters with scope=asset and phase=fulfillment', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
          id: 'PRD-000-000-000'
      }
    };
    sandbox.stub(Inventory.prototype, 'getAssetParametersForFulfillmentByProduct').returns(responses.triggers.fulfillment_parameters);
    appTester(App.triggers.fulfillment_parameters.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array().of.size(1);
        results[0].should.have.property('name').eql('activation_link');
        results[0].should.have.property('scope').eql('asset');
        results[0].should.have.property('phase').eql('fulfillment');
        done();
      })
      .catch(done);
  });
});
