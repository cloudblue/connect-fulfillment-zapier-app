/* globals describe it */
const should = require('should');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const { ProductService } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');
// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');
const getConnectClient = require('../../lib/utils').getConnectClient;

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
    sandbox.stub(ProductService.prototype, 'getAssetParametersForFulfillmentByProduct').returns(responses.triggers.fulfillment_parameters);
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
