/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
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
        param_a: 'value_a'
      }
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [{ id: 'param_a', value: 'value_a' }]);
  });
  it('createUpdateTierConfigRequest with params array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createUpdateTierConfigRequest: mockedFn,
    };
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params: [{
        id: 'param_a',
        value: 'value_a'
      }]
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [{ id: 'param_a', value: 'value_a' }]);
  });
});