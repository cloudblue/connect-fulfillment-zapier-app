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



  const ASSET_ID_IN = {
    asset_lookup_field: 'asset_id',
    asset_lookup_value: 'AS-000',
    period_from: '2020-01-01T00:00:00+00:00',
    period_to: '2021-01-01T00:00:00+00:00',
    period_delta: 1.0,
    period_uom: 'monthly',
  };

  it.each([
    ['provider', 'asset_id', 'AS-0000'],
    ['vendor', 'asset_id', 'AS-0000'],
    ['provider', 'asset_external_uid', 'external_uid'],
    ['vendor', 'asset_external_uid', 'external_uid'],    
  ])('create for %s (%s)', async (account, lookupField, lookupValue) => {
    const bundle = {
      authData: {
        account_type: account,
      },
      inputData: {
        asset_lookup_field: lookupField,
        asset_lookup_value: lookupValue,
        period_from: '2020-01-01T00:00:00+00:00',
        period_to: '2021-01-01T00:00:00+00:00',
        period_delta: 1.0,
        period_uom: 'monthly',        
      },
    };
    createBillingRequest.mockReturnValue({});
    await appTester(App.creates.create_billing_request.operation.perform, bundle);
    expect(createBillingRequest).toHaveBeenCalledWith(expect.anything(), account, bundle.inputData); 
  });
});