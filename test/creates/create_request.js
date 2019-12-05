/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const getConnectClient = require('../../lib/utils').getConnectClient;
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Create Request', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should return a payload of the rejected request', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        product_id: 'PRD-000-000-000',
        marketplace_id: 'MP-00000',
        connection_id: 'CT-0000-0000-0000',
        // t1
        t1_company_name: 'T1 Company',
        t1_address1: 'T1 Address 1',
        t1_address2: 'T1 Address 2',
        t1_postal_code: '08010',
        t1_city: 'Barcelona',
        t1_state: 'Barcelona',
        t1_coutry: 'ES',
        t1_first_name: 'T1 First Name',
        t1_last_name: 'T1 Last Name',
        t1_email: 't1@example.com',
        t1_phone: '+34931221414',
        // customer
        customer_company_name: 'Cust Company',
        customer_address1: 'Cust Address 1',
        customer_address2: 'Cust Address 2',
        customer_postal_code: '08010',
        customer_city: 'Barcelona',
        customer_state: 'Barcelona',
        customer_coutry: 'ES',
        customer_first_name: 'Cust First Name',
        customer_last_name: 'Cust Last Name',
        customer_email: 't1@example.com',
        customer_phone: '+34931221414',        
        items: [
            {id: 'SKU_1', quantity: 30},
            {id: 'SKU_2', quantity: 10},
        ]
      }
    };

    // Mock the sdk function to return this response 
    sandbox.stub(getConnectClient({request: null}, bundle).requests, 'create').returns(responses.creates.create_request);
    // Call to zapier function to test
    appTester(App.creates.create_request.operation.perform, bundle)
      .then(results => {
        results.should.be.an.Object();
        done();
      })
      .catch(done);
  });
});