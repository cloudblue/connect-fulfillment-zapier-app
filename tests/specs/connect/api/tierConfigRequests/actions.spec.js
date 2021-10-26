/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Directory: jest.fn(),
    Fulfillment: jest.fn(),
  }
});

const { ConnectClient, Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  listRequests,
  approveRequest,
  updateRequestParameters,
  inquireRequest,
  failRequest,
} = require('../../../../../lib/connect/api/tierConfigRequests/actions');

describe('tierConfigRequests.actions', () => {
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
    Fulfillment.prototype = {
      searchTierConfigRequests: mockedFn
    };
    const data = {
      process_in_batch: true,
      records_per_page: 100,
      status: 'pending',
      configuration_account_id: 'VA-000'
    };
    await listRequests(client, data, '-created');
    expect(mockedFn).toHaveBeenCalledWith({
      status: 'pending',
      'configuration__account__id': 'VA-000',
      limit: 100,
      offset: 0,
      $ordering: '-created'
    });
  });
  it('listRequests all', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Fulfillment.prototype = {
      searchTierConfigRequests: mockedFn
    };
    const data = {
      process_in_batch: false,
      status: 'pending',
      configuration_account_id: 'VA-000'
    };
    await listRequests(client, data, '-created');
    expect(mockedFn).toHaveBeenCalledWith({
      status: 'pending',
      'configuration__account__id': 'VA-000',
      limit: 100,
      offset: 0,
      $ordering: '-created'
    });
  });
  it('listRequests (unassigned)', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Fulfillment.prototype = {
      searchTierConfigRequests: mockedFn
    };
    const data = {
      process_in_batch: true,
      records_per_page: 100,
      assignee_id: 'UNASSIGNED'
    };
    await listRequests(client, data, '-created');
    expect(mockedFn).toHaveBeenCalledWith({
      unassigned: true,
      limit: 100,
      offset: 0,
      $ordering: '-created'
    });
  });
  it('approveRequest', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      approveTierConfigRequestWithTemplate: mockedFn
    };
    const data = {
      id: 'TCR-000',
      template_id: 'TL-000'
    };
    await approveRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', 'TL-000');
  });
  it('updateRequestParameters with param dict', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      updateTierConfigRequestParameters: mockedFn
    };
    const data = {
      request_id: 'TCR-000',
      params: {param_a: 'value_a', param_b: '{"a": "value"}'},
      notes: 'notes'
    };
    await updateRequestParameters(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', [
      {id: 'param_a', value: 'value_a'},
      {id: 'param_b', structured_value: {a: 'value'}},
    ], 'notes');
  });
  it('updateRequestParameters with param array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      updateTierConfigRequestParameters: mockedFn
    };
    const data = {
      request_id: 'TCR-000',
      params: [
        {id: 'param_a', value: 'value_a'},
        {id: 'param_b', value: '{"a": "value"}'},
      ],
      notes: 'notes'
    };
    await updateRequestParameters(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', [
      {id: 'param_a', value: 'value_a'},
      {id: 'param_b', structured_value: {a: 'value'}},
    ], 'notes');
  });
  it('inquireRequest with param dict', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      inquireTierConfigRequest: mockedFn
    };
    const data = {
      request_id: 'TCR-000',
      params: {param_a: 'value_error_a'},
      notes: 'note'
    };
    await inquireRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', [{id: 'param_a', value_error: 'value_error_a'}], 'note');
  });
  it('inquireRequest with param array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      inquireTierConfigRequest: mockedFn
    };
    const data = {
      request_id: 'TCR-000',
      params: [{id: 'param_a', value_error: 'value_error_a'}],
      notes: 'note'
    };
    await inquireRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', [{id: 'param_a', value_error: 'value_error_a'}], 'note');
  });
  it('failRequest', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      failTierConfigRequest: mockedFn
    };
    const data = {
      request_id: 'TCR-000',
      reason: 'reason'
    };
    await failRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('TCR-000', 'reason');
  });
});

