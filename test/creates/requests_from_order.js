/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const should = require('should');
const { Directory, Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const sinon = require('sinon');
const zapier = require('zapier-platform-core');
const responses = require('../responses');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Connect Fulfillment Zapier App - Create Asset Requests from Order', () => {
  let sandbox;
  before(() => { sandbox = sinon.createSandbox(); });
  afterEach(done => { sandbox.restore(); done(); });
  it('should create purchase, change and cancel requests', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        asset_external_id: 'WL6IKB3OZ7',
        hub_id: 'HB-0000-0000',
        items: [
          {
            id: 'PRD-407-420-078-0001',
            quantity: 3
          },
          {
            id: 'PRD-407-420-078-0002',
            quantity: 0
          },
          {
            id: 'PRD-263-744-774-0001',
            quantity: 5
          },
          {
            id: 'PRD-111-222-333-0001',
            quantity: 0
          },
          {
            id: 'PRD-111-222-333-0002',
            quantity: 0
          },
        ],
        t1_external_id: '',
        t1_external_uid: '',
        t1_company_name: '',
        t1_address1: '',
        t1_address2: '',
        t1_postal_code: '',
        t1_city: '',
        t1_state: '',
        t1_country: '',
        t1_first_name: '',
        t1_last_name: '',
        t1_email: '',
        t1_phone: '+43931221111',
        customer_external_id: '',
        customer_external_uid: '',
        customer_company_name: '',
        customer_address1: '',
        customer_address2: '',
        customer_postal_code: '',
        customer_city: '',
        customer_state: '',
        customer_country: 'IT',
        customer_first_name: '',
        customer_last_name: '',
        customer_email: '',
        customer_phone: '0817434329',
      },
    };
    sandbox.stub(Fulfillment.prototype, 'getConnectionIdByProductAndHub')
      .withArgs('PRD-263-744-774', 'HB-0000-0000')
      .returns('CT-0000-0000');
    sandbox.stub(Fulfillment.prototype, 'createRequest').callsFake(async (req) => {
      if (req.type === 'purchase') {
        return {
          id: 'PR-3590-4186-1549-001',
          type: 'purchase',
          status: 'tiers_setup',
          asset: {
            id: 'AS-3590-4186-1549',
            external_uid: '205a1b3e-bb14-4122-815c-23d7fd0f8191'
          },
          params_form_url: 'https://customer.cnct.tech/?code=DblKOm3VkFtH8qUw&request_id=PR-3590-4186-1549-001'
        };
      }
      if (req.type === 'cancel') {
        return {
          id: 'PR-0126-3396-8831-005',
          type: 'cancel',
          status: 'pending',
          asset: {
            id: 'AS-0126-3396-8831',
            external_uid: '275a1b3e-bb14-4922-815c-23d9fd0f8192'
          }
        }
      }
      return {
        id: 'PR-0126-3396-8831-004',
        type: 'change',
        status: 'pending',
        asset: {
          id: 'AS-0126-3396-8831',
          external_uid: '275a1b3e-bb14-4922-815c-23d9fd0f8192'
        }
      };
    });
    const stubDirectory = sandbox.stub(Directory.prototype, 'getAssetsByProductIdExternalId');
    stubDirectory
      .withArgs('PRD-407-420-078', 'WL6IKB3OZ7')
      .returns([{
        id: 'AS-0126-3396-8831',
        items: [
          {
            id: 'PRD-407-420-078-0002',
            quantity: 8
          },
          {
            id: 'PRD-407-420-078-0001',
            quantity: 10
          }
        ]
      }]);
    stubDirectory
      .withArgs('PRD-111-222-333', 'WL6IKB3OZ7')
      .returns([{
        id: 'AS-1111-2222-3333',
        items: [
          {
            id: 'PRD-111-222-333-0002',
            quantity: 8
          },
          {
            id: 'PRD-111-222-333-0001',
            quantity: 10
          }
        ]
      }]);
    stubDirectory
      .withArgs('PRD-263-744-774', 'WL6IKB3OZ7')
      .returns([]);
    // Call to zapier function to test
    appTester(App.creates.create_asset_requests_from_order.operation.perform, bundle)
      .then(results => {
        // console.log(JSON.stringify(results, null, 2));
        results.should.be.an.Object();
        done();
      })
      .catch(done);
  });
  it('should skip the purchase request creation', done => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        asset_external_id: 'WL6IKB3OZ7',
        hub_id: 'HB-0000-0000',
        items: [
          {
            id: 'PRD-407-420-078-0001',
            quantity: 3
          },
        ],
        t1_external_id: '',
        t1_external_uid: '',
        t1_company_name: '',
        t1_address1: '',
        t1_address2: '',
        t1_postal_code: '',
        t1_city: '',
        t1_state: '',
        t1_country: '',
        t1_first_name: '',
        t1_last_name: '',
        t1_email: '',
        t1_phone: '+43931221111',
        customer_external_id: '',
        customer_external_uid: '',
        customer_company_name: '',
        customer_address1: '',
        customer_address2: '',
        customer_postal_code: '',
        customer_city: '',
        customer_state: '',
        customer_country: 'IT',
        customer_first_name: '',
        customer_last_name: '',
        customer_email: '',
        customer_phone: '0817434329',
      },
    };
    sandbox.stub(Fulfillment.prototype, 'getConnectionIdByProductAndHub')
      .withArgs('PRD-407-420-078', 'HB-0000-0000')
      .returns(null);

    const stubDirectory = sandbox.stub(Directory.prototype, 'getAssetsByProductIdExternalId');

    stubDirectory
      .withArgs('PRD-407-420-078', 'WL6IKB3OZ7')
      .returns([]);
    // Call to zapier function to test
    appTester(App.creates.create_asset_requests_from_order.operation.perform, bundle)
      .then(results => {
        console.log(JSON.stringify(results, null, 2));
        results.should.be.an.Object();
        done();
      })
      .catch(done);
  });
});
