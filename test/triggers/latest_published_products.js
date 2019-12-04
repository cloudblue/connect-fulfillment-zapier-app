/* globals describe it */
const should = require('should');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const responses = require('../responses');
const getConnectClient = require('../../lib/utils').getConnectClient;

describe('Connect Fulfillment Zapier App - Products', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of the latest version of products that are published', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    sandbox.stub(getConnectClient({request: null}, bundle).products, 'list').returns(responses.triggers.latest_published_products);
    appTester(App.triggers.latest_published_products.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
});
