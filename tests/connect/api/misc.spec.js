/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    Inventory: jest.fn(),
    Directory: jest.fn(),
  }
});

const { Inventory, Directory } = require('@cloudblueconnect/connect-javascript-sdk');
const { ConnectClient } = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');

const {
  listUsers,
  createMessage,
  getActivationTemplates,
  getAssetParametersForFulfillmentByProduct,
  listHubs,
  listVisibleProducts,
  getMessagesByObjectId,
  searchAssets,
  searchTierConfigs,
} = require('../../../lib/connect/api/misc');

describe('misc', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('searchTierConfigs', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchTierConfigurations: mockedFn
    }
    const data = {
      id: 'TC-000',
      product_id: 'PRD-000',
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00',
      updated_before: '2020-03-01T09:11:22+00:00',
      updated_after: '2020-01-01T09:11:22+00:00'
    };
    await searchTierConfigs(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      id: 'TC-000',
      'product.id': 'PRD-000',
      created: {
        $ge: '2019-12-01T09:11:22.000Z',
        $le: '2019-12-05T09:11:22.000Z'
      },
      updated: {
        $ge: '2020-01-01T09:11:22.000Z',
        $le: '2020-03-01T09:11:22.000Z'
      },
      limit: 100,
      offset: 0,
    });
  });
  it('searchTierConfigs (without dates)', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchTierConfigurations: mockedFn
    }
    const data = {
      id: 'TC-000',
      product_id: 'PRD-000'
    };
    await searchTierConfigs(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      id: 'TC-000',
      'product.id': 'PRD-000',
      limit: 100,
      offset: 0,
    });
  });
  it('searchAssets', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchAssets: mockedFn
    }
    const data = {
      contract_id: ['CRD-000', 'CRD-111'],
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00',
      updated_before: '2020-03-01T09:11:22+00:00',
      updated_after: '2020-01-01T09:11:22+00:00'
    };
    await searchAssets(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      'contract.id': ['CRD-000', 'CRD-111'],
      created: {
        $gt: '2019-12-01T09:11:22.000Z',
        $lt: '2019-12-05T09:11:22.000Z'
      },
      updated: {
        $gt: '2020-01-01T09:11:22.000Z',
        $lt: '2020-03-01T09:11:22.000Z'
      },
      limit: 100,
      offset: 0,
    });
  });
  it('searchAssets without dates', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Directory.prototype = {
      searchAssets: mockedFn
    }
    const data = {
      contract_id: ['CRD-000', 'CRD-111'],
    };
    await searchAssets(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      'contract.id': ['CRD-000', 'CRD-111'],
      limit: 100,
      offset: 0,
    });
  });
  it('listUsers', async () => {
    const mockedFn = client.accounts.users('VA-000').search = jest.fn();
    mockedFn.mockReturnValue([]);
    const data = {
      account_id: 'VA-000',
      page: 0,
    };
    const users = await listUsers(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      limit: 30,
      offset: 0,
    });
    expect(users).toBeInstanceOf(Array);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0].id).toEqual('UNASSIGNED');
    expect(users[0].name).toEqual('-- Unassigned --');
  });
  it('createMessage', async () => {
    const mockedFn1 = client.conversations.getConversationsByObjectId = jest.fn();
    mockedFn1.mockReturnValue([{id: 'CO-000'}]);
    const mockedFn2 = client.conversations.createMessage = jest.fn();
    mockedFn2.mockReturnValue({});  
    const data = {
      id: 'PR-000',
      text: 'hello world',
    };
    await createMessage(client, data);
    expect(mockedFn1).toHaveBeenCalledWith('PR-000');
    expect(mockedFn2).toHaveBeenCalledWith('CO-000', 'hello world');
  });

  it('listUsers (second page)', async () => {
    const mockedFn = client.accounts.users('VA-000').search = jest.fn();
    mockedFn.mockReturnValue([]);
    const data = {
      account_id: 'VA-000',
      page: 1,
    };
    const users = await listUsers(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      limit: 30,
      offset: 30,
    });
    expect(users).toBeInstanceOf(Array);
  });
  it('createMessage', async () => {
    const mockedFn1 = client.conversations.getConversationsByObjectId = jest.fn();
    mockedFn1.mockReturnValue([{id: 'CO-000'}]);
    const mockedFn2 = client.conversations.createMessage = jest.fn();
    mockedFn2.mockReturnValue({});  
    const data = {
      id: 'PR-000',
      text: 'hello world',
    };
    await createMessage(client, data);
    expect(mockedFn1).toHaveBeenCalledWith('PR-000');
    expect(mockedFn2).toHaveBeenCalledWith('CO-000', 'hello world');
  });

  it('getMessagesByObjectId', async () => {
    const mockedFn1 = client.conversations.getConversationsByObjectId = jest.fn();
    mockedFn1.mockReturnValue([{id: 'CO-000'}]);
    const mockedFn2 = client.conversations.get = jest.fn();
    mockedFn2.mockReturnValue([]);  
    const data = {
      id: 'PR-000',
    };
    await getMessagesByObjectId(client, data);
    expect(mockedFn1).toHaveBeenCalledWith('PR-000');
    expect(mockedFn2).toHaveBeenCalledWith('CO-000');
  });

  it('getActivationTemplates', async () => {
    const mockedFn = jest.fn();
    Inventory.prototype = {
      getProductAssetTemplates: mockedFn,
    };
    mockedFn.mockReturnValue([]);
    await getActivationTemplates(client);
    expect(mockedFn).toHaveBeenCalled();
  });
  it('getAssetParametersForFulfillmentByProduct', async () => {
    const mockedFn = jest.fn();
    Inventory.prototype = {
      getAssetParametersForFulfillmentByProduct: mockedFn,
    };
    mockedFn.mockReturnValue([]);
    await getAssetParametersForFulfillmentByProduct(client, {id: 'PRD-000'});
    expect(mockedFn).toHaveBeenCalledWith('PRD-000');
  });
  it('listHubs', async () => {
    const mockedFn = client.hubs.search = jest.fn();
    mockedFn.mockReturnValue([]);
    await listHubs(client);
    expect(mockedFn).toHaveBeenCalled();
  });
  it('listVisibleProducts', async () => {
    const mockedFn = client.products.search = jest.fn();
    mockedFn.mockReturnValue([
      {
        id: 'PRD-000-000-000',
        stats: {
          contracts: {
              distribution: 1,
              sourcing: 0
          },
          listings: 1,
          agreements: {
              distribution: 1,
              sourcing: 0
          }
        },
      },
      {
        id: 'PRD-000-000-001',
        stats: {
          contracts: {
              distribution: 1,
              sourcing: 0
          },
          listings: 1,
          agreements: {
              distribution: 2,
              sourcing: 0
          }
        },
      },
      {
        id: 'PRD-000-000-002',
        stats: {
          contracts: {
              distribution: 1,
              sourcing: 0
          },
          listings: 1,
          agreements: {
              distribution: 0,
              sourcing: 0
          }
        },
      },
      {
        id: 'PRD-000-000-003',
        visibility: {
          syndication: true,
          owner: false,
          listing: true
        }
      },
      {
        id: 'PRD-000-000-004',
        visibility: {
          syndication: false,
          owner: false,
          listing: false
        }
      }
    ]);
    const results = await listVisibleProducts(client);
    expect(mockedFn).toHaveBeenCalled();
    expect(results).toBeInstanceOf(Array);
    expect(results).toHaveLength(3);
  });
});

