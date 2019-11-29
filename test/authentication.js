const should = require('should');
const zapier = require('zapier-platform-core');
const getConnectClient = require('../lib/utils').getConnectClient;
const HttpError = require('connect-javascript-sdk').HttpError;
const sinon = require('sinon');

const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Zapier App', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('passes authentication and returns account info', done => {
    
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    sandbox.stub(getConnectClient({request: null}, bundle).accounts, 'list').returns([
      {
        id: 'VA-000-000',
        name: 'Vendor',
        type: 'vendor',
        brand: 'BR-704',
        external_id: '5b3e4e1d-f9f6-e811-a95a-000d3a1f74d1',
        events : {
            created: {
                at: '2018-06-04T13:19:10+00:00'
            }
        },
        sourcing: false
     }
    ]);
    appTester(App.authentication.test, bundle)
      .then(jsonResponse => {
        jsonResponse.should.be.an.Object();
        jsonResponse.should.have.property('account_info').eql('Vendor (VA-000-000)');
        done();
      })
      .catch(done);
  });
  it('fails on bad api key', () => {
    const bundle = {
      authData: {
        api_key: 'fake',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    sandbox.stub(getConnectClient({request: null}, bundle).accounts, 'list').throws(new HttpError(401, 'Unauthorized'));
    return appTester(App.authentication.test, bundle).should.be.rejected();
  });
});