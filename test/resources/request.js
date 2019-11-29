/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

/* globals describe it */
const should = require('should');
const getConnectClient = require('../../lib/utils').getConnectClient;
const HttpError = require('connect-javascript-sdk').HttpError;
const sinon = require('sinon');
const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Zapier App', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a list of requests filtered by status', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        status: ['pending', 'inquiring']
      }
    };
    sandbox.stub(getConnectClient({request: null}, bundle).requests, 'list').returns([
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
    appTester(App.resources.request.list.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Array();
        done();
      })
      .catch(done);
  });
  // it('should create a request', done => {
  //   const bundle = {
  //     authData: {
  //       api_key: process.env.CONNECT_API_KEY,
  //       endpoint: process.env.CONNECT_ENDPOINT
  //     },
  //     inputData: {
  //       product_id: 'PRD-546-534-461',
  //       marketplace_id: 'MP-06105',
  //       connection_id: 'CT-0000-0000-0000',
  //       t1_company_name: 'T1 test company',
  //       t1_address1: 'T1 test address 1',
  //       t1_postal_code: '08023',
  //       t1_city: 'barcelona',
  //       t1_state: 'barcelona',
  //       t1_country: 'ES',
  //       t1_first_name: 'T1 test contact first name',
  //       t1_last_name: 'T1 test contact last name',
  //       t1_email: 'ffaraone+t1+zapier@gmail.com',
  //       t1_phone: '+34931221496',
  //       customer_company_name: 'CUST test company',
  //       customer_address1: 'CUST test address 1',
  //       customer_postal_code: '80131',
  //       customer_city: 'napoli',
  //       customer_state: 'napoli',
  //       customer_country: 'IT',
  //       customer_first_name: 'CUST test contact first name',
  //       customer_last_name: 'CUST test contact last name',
  //       customer_email: 'ffaraone+customer+zapier@gmail.com',
  //       customer_phone: '+390817434329',
  //       items: [{id: 'SKU_B', quantity: '-1'}]
  //     }
  //   };

  //   appTester(App.resources.request.create.operation.perform, bundle)
  //     .then(results => {
  //       console.log(results);
  //       should.exist(results);
  //       done();
  //     })
  //     .catch(done);
  // });
});
