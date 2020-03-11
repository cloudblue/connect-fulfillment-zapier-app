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




describe('billingRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it.each([
    ['provider', 'id', 'asset_id', 'AS-0000'],
    ['vendor', 'id', 'asset_id', 'AS-0000'],
    ['provider', 'external_uid', 'asset_external_uid', 'external_uid'],
    ['vendor', 'external_uid', 'asset_external_uid', 'external_uid'],
  ])('create for %s (%s)', async (account, fieldName, lookupField, lookupValue) => {

    const data = {
      asset_lookup_field: lookupField,
      asset_lookup_value: lookupValue,
      attributes: { a: 'b', c: true },
      period_from: '2020-01-01T00:00:00+00:00',
      period_to: '2021-01-01T00:00:00+00:00',
      period_delta: 1.0,
      period_uom: 'monthly',
      items: [
        { item_id: 'MY_SKU' }
      ],
    };
    const mockedFn = jest.fn();
    Subscriptions.prototype = {
      createBillingRequest: mockedFn,
    };
    const expected = {
      asset: {},
      attributes: {},
      type: account,
      items: [
        { id: 'MY_SKU' },
      ],
      period: {
        from: '2020-01-01T00:00:00.000Z',
        to: '2021-01-01T00:00:00.000Z',
        delta: 1.0,
        uom: 'monthly',
      },
    };
    expected.asset[fieldName] = lookupValue;
    expected.attributes[account] = { a: 'b', c: true };
    await createBillingRequest(client, account, data);
    expect(mockedFn).toHaveBeenCalledWith(expected);
  });
});
