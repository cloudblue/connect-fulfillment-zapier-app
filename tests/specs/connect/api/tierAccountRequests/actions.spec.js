/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Directory: jest.fn(),
  }
});

const { ConnectClient, Directory } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  listRequests,
  acceptRequest,
  ignoreRequest,
} = require('../../../../../lib/connect/api/tierAccountRequests/actions');

describe('tierAccountRequests.actions', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('listRequests in batch', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchTierAccountRequests: mockedFn
    };
    const data = {
      process_in_batch: true,
      records_per_page: 100,
      account_id: 'TA-0000',
      product_id: 'PRD-000',
    };
    await listRequests(client, data, '-events.created.at');
    expect(mockedFn).toHaveBeenCalledWith({
      'account.id': 'TA-0000',
      'product.id': 'PRD-000',
      limit: 100,
      offset: 0,
      $ordering: '-events.created.at'
    });
  });
  it('listRequests all', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchTierAccountRequests: mockedFn
    };
    const data = {
      account_id: 'TA-0000',
      product_id: 'PRD-000'
    };
    await listRequests(client, data, '-events.created.at');
    expect(mockedFn).toHaveBeenCalledWith({
      'account.id': 'TA-0000',
      'product.id': 'PRD-000',
      limit: 100,
      offset: 0,
      $ordering: '-events.created.at'
    });
  });
  it('acceptRequest', async () => {
    const mockedFn = jest.fn();
    Directory.prototype = {
      acceptTierAccountRequest: mockedFn
    };
    const data = {
      id: 'TAR-0000',
    };
    await acceptRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TAR-0000');
  });
  it('ignoreRequest', async () => {
    const mockedFn = jest.fn();
    Directory.prototype = {
      ignoreTierAccountRequest: mockedFn
    };
    const data = {
      id: 'TAR-0000',
      reason: 'reason',
    };
    await ignoreRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TAR-0000', 'reason');
  });
});

