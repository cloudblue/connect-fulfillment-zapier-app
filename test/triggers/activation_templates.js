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

describe('Connect Fulfillment Zapier App - Activation templates', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of templates for product with scope="asset"', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
          id: 'PRD-000-000-000'
      }
    };
    sandbox.stub(ProductService.prototype, 'getProductAssetTemplates').returns(responses.triggers.activation_templates);
    appTester(App.triggers.activation_templates.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
