const should = require('should');
const zapier = require('zapier-platform-core');
const { AccountResource } = require('@cloudblueconnect/connect-javascript-sdk/lib/connect/api');
const { HttpError, ConnectClient } = require('@cloudblueconnect/connect-javascript-sdk');
const sinon = require('sinon');

const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Authentication', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('passes authentication (prod) and returns account info', done => {
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ'
      }
    };
    
    // const spy = sandbox.spy(ConnectClient.prototype, 'constructor');
    // spy.should.be.calledWith('');
    sandbox.stub(AccountResource.prototype, 'list').returns([
      {
        id: 'VA-000-000',
        name: 'Vendor',
        type: 'vendor',
        brand: 'BR-704',
        external_id: '5b3e4e1d-f9f6-e811-a95a-000d3a1f74d1',
        events: {
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
  it('passes authentication (!=prod) and returns account info', done => {

    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ@https://api.cnct.tech/public/v1'
      }
    };
    sandbox.stub(AccountResource.prototype, 'list').returns([
      {
        id: 'VA-000-000',
        name: 'Vendor',
        type: 'vendor',
        brand: 'BR-704',
        external_id: '5b3e4e1d-f9f6-e811-a95a-000d3a1f74d1',
        events: {
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
        jsonResponse.should.have.property('account_info').eql('Vendor (VA-000-000) [https://api.cnct.tech/public/v1]');
        done();
      })
      .catch(done);
  });
  it('passes authentication (!=prod) and returns account info (trailing slash)', done => {

    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ@https://api.cnct.tech/public/v1/'
      }
    };
    sandbox.stub(AccountResource.prototype, 'list').returns([
      {
        id: 'VA-000-000',
        name: 'Vendor',
        type: 'vendor',
        brand: 'BR-704',
        external_id: '5b3e4e1d-f9f6-e811-a95a-000d3a1f74d1',
        events: {
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
        jsonResponse.should.have.property('account_info').eql('Vendor (VA-000-000) [https://api.cnct.tech/public/v1]');
        done();
      })
      .catch(done);
  });

  it('fails on bad auth token', () => {
    const bundle = {
      authData: {
        auth_token: 'fake',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    sandbox.stub(AccountResource.prototype, 'list').throws(new HttpError(401, 'Unauthorized'));
    return appTester(App.authentication.test, bundle).should.be.rejected();
  });

  it('fails on bad api key', () => {
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.3OY8IHyO-hxSe-PR1W3FjfSeRe0j682Jn8lskLkAplk',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    sandbox.stub(AccountResource.prototype, 'list').throws(new HttpError(401, 'Unauthorized'));
    return appTester(App.authentication.test, bundle).should.be.rejected();
  });
});