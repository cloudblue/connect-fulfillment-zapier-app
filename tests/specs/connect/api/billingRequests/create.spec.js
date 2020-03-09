/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Subscriptions: jest.fn(),
  }
});

const { ConnectClient, Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');

const {
  createBillingRequest,
} = require('../../../../../lib/connect/api/billingRequests/create');


const PROVIDER_BRP_IN = {
  asset_external_uid: '00000000-0000-0000-0000-000000000001',
  type: 'provider',
  items: [
    {
      item_id: 'MY_SHINY_SKU'
    }
  ],
  provider_external_id: 'some-identifier',
  period_from: '2019-01-01T00:00:00Z',
  period_to: '2019-02-01T00:00:00Z',
  period_delta: 1.0,
  period_uom: 'monthly',
};


const PROVIDER_BRP = {
  asset: {
    external_uid: '00000000-0000-0000-0000-000000000001',
  },
  type: 'provider',
  items: [
    {
      id: 'MY_SHINY_SKU'
    }
  ],
  attributes: {
    provider: {
      external_id: 'some-identifier'
    }
  },
  period: {
    from: '2019-01-01T00:00:00.000Z',
    to: '2019-02-01T00:00:00.000Z',
    delta: 1.0,
    uom: 'monthly'
  }
};


const VENDOR_BRP_IN = {
  asset_id: 'AS-000',
  type: 'vendor',
  vendor_external_id: 'some-identifier',
};


const VENDOR_BRP = {
  asset: {
    id: 'AS-000',
  },
  type: 'vendor',

  attributes: {
    vendor: {
      external_id: 'some-identifier'
    }
  },
};


describe('billingRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['provider', PROVIDER_BRP_IN, PROVIDER_BRP],
    ['vendor', VENDOR_BRP_IN, VENDOR_BRP],
  ])('createBillingRequest %s', async (testcase, input, expected) => {
    const mockedFn = jest.fn();
    Subscriptions.prototype = {
      createBillingRequest: mockedFn,
    };
    await createBillingRequest(client, input);
    expect(mockedFn).toHaveBeenCalledWith(expected);
  });
});