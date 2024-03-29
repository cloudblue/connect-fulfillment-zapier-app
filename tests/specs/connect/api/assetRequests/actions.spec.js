/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 -2021 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    Directory: jest.fn(),
    Fulfillment: jest.fn(),
  }
});

const { ConnectClient }  = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');  
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  listRequests,
  approveRequest,
  updateRequestParameters,
  inquireRequest,
  rejectRequest,
  scheduleRequest,
  revokeRequest,
  confirmRequest,
} = require('../../../../../lib/connect/api/assetRequests/actions');

describe('assetRequests.actions', () => {
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
      searchRequests: mockedFn
    };
    const data = {
      process_in_batch: true,
      records_per_page: 100,
      type: ['purchase', 'change'],
      status: ['pending', 'approved'],
      product_id: 'PRD-000'
    };
    await listRequests(client, data, '-created');
    expect(mockedFn).toHaveBeenCalledWith({
      type: { $in: ['purchase', 'change'] },
      status: { $in: ['pending', 'approved'] },
      'asset.product.id': 'PRD-000',
      limit: 100,
      offset: 0,
      $ordering: '-created'
    });
  });
  it('listRequests all', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Fulfillment.prototype = {
      searchRequests: mockedFn
    };
    const data = {
      process_in_batch: false,
      type: ['purchase', 'change'],
      product_id: 'PRD-000'
    };
    await listRequests(client, data, '-created');
    expect(mockedFn).toHaveBeenCalledWith({
      type: {$in: ['purchase', 'change'] },
      'asset.product.id': 'PRD-000',
      limit: 100,
      offset: 0,
      $ordering: '-created'
    });
  });
  it('approveRequest', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      approveRequestWithTemplate: mockedFn
    };
    const data = {
      id: 'PR-000',
      template_id: 'TL-000'
    };
    await approveRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', 'TL-000');
  });
  it('updateRequestParameters with param dict', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      updateRequestParameters: mockedFn
    };
    const data = {
      request_id: 'PR-000',
      params: {param_a: 'value_a', param_b: '{"a": "value"}'},
      note: 'note'
    };
    await updateRequestParameters(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', [
      {id: 'param_a', value: 'value_a'},
      {id: 'param_b', structured_value: {a: 'value'}},
    ], 'note');
  });
  it('updateRequestParameters with param array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      updateRequestParameters: mockedFn
    };
    const data = {
      request_id: 'PR-000',
      params: [
        {id: 'param_a', value: 'value_a'},
        {id: 'param_b', value: '{"a": "value"}'},
      ],
      note: 'note'
    };
    await updateRequestParameters(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', [
      {id: 'param_a', value: 'value_a'},
      {id: 'param_b', structured_value: {a: 'value'}},
    ], 'note');
  });
  it('inquireRequest with param dict', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      inquireRequestWithTemplate: mockedFn
    };
    const data = {
      request_id: 'PR-000',
      template_id: 'TL-000',
      params: {param_a: 'value_error_a'},
      note: 'note'
    };
    await inquireRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', 'TL-000', [{id: 'param_a', value_error: 'value_error_a'}], 'note');
  });
  it('inquireRequest with param array without template', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      inquireRequest: mockedFn
    };
    const data = {
      request_id: 'PR-000',
      params: [{id: 'param_a', value_error: 'value_error_a'}],
      note: 'note'
    };
    await inquireRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', {}, [{id: 'param_a', value_error: 'value_error_a'}], 'note');
  });
  it('rejectRequest', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      failRequest: mockedFn
    };
    const data = {
      request_id: 'PR-000',
      reason: 'reason'
    };
    await rejectRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', 'reason');
  });
  it('scheduleRequest', async () => {
    const mockedFn = jest.fn();
    client.requests.schedule = mockedFn;
    const data = {
      request_id: 'PR-000',
      planned_date: '2021-08-04T20:10:59+00:00'
    };
    await scheduleRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', '2021-08-04T20:10:59.000Z');
  });
  it('revokeRequest', async () => {
    const mockedFn = jest.fn();
    client.requests.revoke = mockedFn;
    const data = {
      request_id: 'PR-000',
      reason: 'reason'
    };
    await revokeRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000', 'reason');
  });
  it('confirmRequest', async () => {
    const mockedFn = jest.fn();
    client.requests.confirm = mockedFn;
    const data = {
      request_id: 'PR-000'
    };
    await confirmRequest(client, data);
    expect(mockedFn).toHaveBeenCalledWith('PR-000');
  });
});

