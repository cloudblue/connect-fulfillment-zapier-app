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

const { ConnectClient, Fulfillment, Directory } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  lookupAssetByProductIdExternalId,
  lookupConnectionByProductHub,
  lookupTierByExternalId,
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
  it('lookupAssetByProductIdExternalId returns the asset', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      getAssetsByProductIdExternalId: mockedFn
    };
    await lookupAssetByProductIdExternalId(client, 'PRD-000', 'external_id');
    expect(mockedFn).toHaveBeenCalledWith('PRD-000', 'external_id');
  });
  
  it.each([
    ['return null', null, null],
    ['return empty array', [], null],
    ['return one value', [{external_uid: '12345'}], '12345'],
    ['return values', [{external_uid: '12345'}, {external_uid: '123457'}], null],
  ])('lookupTierByExternalId %s', async (label, returnedData, expectedValue) => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue(returnedData);
    Directory.prototype = {
        searchTierAccounts: mockedFn
    };
    const result = await lookupTierByExternalId (client, '12345678','HB-000');
    expect(mockedFn).toHaveBeenCalledWith({
        'hub.id': 'HB-000',
        "external_id": "12345678",
    });
    expect(result).toEqual(expectedValue);
  });
});

