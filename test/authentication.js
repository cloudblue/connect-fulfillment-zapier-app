const should = require('should');
const nock = require('nock');
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Zapier App', () => {
  afterEach(done => { nock.cleanAll(); done(); });
  it('passes authentication and returns account info', done => {
    
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    nock(`${process.env.CONNECT_ENDPOINT}`)
      .get('/accounts')
      .reply(200, [
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
    nock(`${process.env.CONNECT_ENDPOINT}`)
      .get('/accounts')
      .reply(401);
    return appTester(App.authentication.test, bundle).should.be.rejectedWith(
      /The API key you supplied is invalid./
    );
  });
});