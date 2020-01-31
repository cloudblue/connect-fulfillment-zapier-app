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
    sandbox.stub(Inventory.prototype, 'getProductAssetTemplates').returns(responses.triggers.activation_templates);
    appTester(App.triggers.activation_templates.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
