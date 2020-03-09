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
      from: '2019-01-01T00:00:00Z',
      to: '2019-02-01T00:00:00Z',
      delta: 1.0,
      uom: 'monthly'
  }
};


describe('billingRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('createBillingRequest', async () => {
    const mockedFn = jest.fn();
    Subscriptions.prototype = {
      createBillingRequest: mockedFn,
    };
    await createBillingRequest(client, PROVIDER_BRP);
    expect(mockedFn).toHaveBeenCalledWith(PROVIDER_BRP);
  });
});