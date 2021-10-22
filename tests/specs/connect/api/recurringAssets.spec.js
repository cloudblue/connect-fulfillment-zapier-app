/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Subscriptions: jest.fn(),
  }
});

const { ConnectClient, Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  listRecurringAssets,
} = require('../../../../lib/connect/api/recurringAssets');

describe('recurringAssets', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('listRecurringAssets in batch', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Subscriptions.prototype = {
      searchRecurringAssets: mockedFn
    };
    const data = {
      process_in_batch: true,
      records_per_page: 100,
      product_id: 'PRD-000',
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00',
      updated_before: '2020-03-01T09:11:22+00:00',
      updated_after: '2020-01-01T09:11:22+00:00',
      billing_next_date_before: '2023-03-01T09:11:22+00:00',
      billing_next_date_after: '2023-01-01T09:11:22+00:00',
    };
    await listRecurringAssets(client, data, '-events.created.at');
    expect(mockedFn).toHaveBeenCalledWith({
      'product.id': 'PRD-000',
      'events.created.at': {
        $ge: '2019-12-01T09:11:22.000Z',
        $le: '2019-12-05T09:11:22.000Z'
      },
      'events.updated.at': {
        $ge: '2020-01-01T09:11:22.000Z',
        $le: '2020-03-01T09:11:22.000Z'
      },
      'billing.next_date': {
        $ge: '2023-01-01T09:11:22.000Z',
        $le: '2023-03-01T09:11:22.000Z'
      },
      limit: 100,
      offset: 0,
      $ordering: '-events.created.at'
    });
  });
  it('listRecurringAssets all', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Subscriptions.prototype = {
      searchRecurringAssets: mockedFn
    };
    const data = {
      product_id: 'PRD-000'
    };
    await listRecurringAssets(client, data, '-events.created.at');
    expect(mockedFn).toHaveBeenCalledWith({
      'product.id': 'PRD-000',
      limit: 100,
      offset: 0,
      $ordering: '-events.created.at'
    });
  });
});

