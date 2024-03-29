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
  createUpdateTierConfigRequest,
} = require('../../../../../lib/connect/api/tierConfigRequests/create');

describe('tierConfigRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('createUpdateTierConfigRequest with params dict', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createUpdateTierConfigRequest: mockedFn,
    };
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params: {
        param_a: 'value_a',
        param_b: '{"a": "value"}',
      }
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [
      { id: 'param_a', value: 'value_a' },
      { id: 'param_b', structured_value: {a: 'value'} },
    ]);
  });
  it('createUpdateTierConfigRequest with params array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createUpdateTierConfigRequest: mockedFn,
    };
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params: [
        {
          id: 'param_a',
          value: 'value_a',
        },
        {
          id: 'param_b',
          value: '{"a": "value"}',
        },
      ]
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [
      { id: 'param_a', value: 'value_a' },
      { id: 'param_b', structured_value: {a: 'value'} },
    ]);
  });
});