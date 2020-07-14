/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


const mockedSearchParams = jest.fn();

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  const mockedFn = jest.fn();

  mockedFn.mockImplementation((endpoint, key, adapter) => {
    return {
      products: {
        parameters: (productId) => {
          return {search: mockedSearchParams}
        },
      },
      addBeforeRequestHook: jest.fn(),
    }
  });
  return {
    ConnectClient: mockedFn,
    AbstractHttpAdapter: jest.fn(),
    Directory: jest.fn(),
    Fulfillment: jest.fn(),
  }
});


const { ConnectClient, Fulfillment, Directory } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  lookupAssetByProductIdExternalId,
  lookupConnectionByProductHub,
  getProductParameters,
} = require('../../../../../lib/connect/api/helpers/lookups');

describe('helpers.lookups', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('lookupAssetByProductIdExternalId returns the connection id', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue('CT-000');
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: mockedFn
    };
    await lookupConnectionByProductHub(client, 'PRD-000', 'HB-000');
    expect(mockedFn).toHaveBeenCalledWith('PRD-000', 'HB-000');
  });
  it('getProductParameters invoke search product parameters on ConnectClient', async () => {
    await getProductParameters(client, 'PRD-000', ['PRM-000', 'PRM-001']);
    expect(mockedSearchParams).toHaveBeenCalledWith({
      id: { $in: ['PRM-000', 'PRM-001'] },
    });
  });
  it('lookupAssetByProductIdExternalId returns the asset', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      getAssetsByProductIdExternalId: mockedFn
    };
    await lookupAssetByProductIdExternalId(client, 'PRD-000', 'external_id');
    expect(mockedFn).toHaveBeenCalledWith('PRD-000', 'external_id');
  });
});