/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/billingRequests/create', () => {
  return {
    createBillingRequest: jest.fn()  
  }
});

const {
  createBillingRequest,
} = require('../../../lib/connect/api/billingRequests/create');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('billingRequests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('create a billing request', async () => {

    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
        account_type: 'provider',
      },
      inputData: {
        asset: {
          external_uid: '00000000',
        },
      }
    };
    createBillingRequest.mockReturnValue({});
    await appTester(App.creates.create_billing_request.operation.perform, bundle);
    expect(createBillingRequest).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});