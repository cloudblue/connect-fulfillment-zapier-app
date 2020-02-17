/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
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
  createAssetPurchaseRequest,
  createAssetChangeRequest,
  createAssetSuspendRequest,
  createAssetResumeRequest,
  createAssetCancelRequest,
  createAssetRequestFromOrder,
} = require('../../../../../lib/connect/api/assetRequests/create');

describe('assetRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });


  const custIn = {
    customer_company_name: 'Cust Company',
    customer_address1: 'Cust Address 1',
    customer_address2: 'Cust Address 2',
    customer_postal_code: '08010',
    customer_city: 'Barcelona',
    customer_state: 'Barcelona',
    customer_country: 'ES',
    customer_first_name: 'Cust First Name',
    customer_last_name: 'Cust Last Name',
    customer_email: 't1@example.com',
    customer_phone: 'zzzzzzzzzzz',
  };

  const custOut = {
    name: 'Cust Company',
    external_id: undefined,
    external_uid: expect.anything(),
    contact_info:
    {
      address_line1: 'Cust Address 1',
      address_line2: 'Cust Address 2',
      postal_code: '08010',
      city: 'Barcelona',
      state: 'Barcelona',
      country: 'ES',
      contact:
      {
        phone_number: {},
        first_name: 'Cust First Name',
        last_name: 'Cust Last Name',
        email: 't1@example.com'
      }
    }
  };

  const t1In = {
    t1_company_name: 'T1 Company',
    t1_external_id: '2',
    t1_address1: 'T1 Address 1',
    t1_address2: 'T1 Address 2',
    t1_postal_code: '08010',
    t1_city: 'Barcelona',
    t1_state: 'Barcelona',
    t1_country: 'ES',
    t1_first_name: 'T1 First Name',
    t1_last_name: 'T1 Last Name',
    t1_email: 't1@example.com',
    t1_phone: '+390817434329',
  };

  const t1Out = {
    name: 'T1 Company',
    external_id: '2',
    external_uid: expect.anything(),
    contact_info:
    {
      address_line1: 'T1 Address 1',
      address_line2: 'T1 Address 2',
      postal_code: '08010',
      city: 'Barcelona',
      state: 'Barcelona',
      country: 'ES',
      contact:
      {
        phone_number:
        {
          country_code: '+39',
          area_code: '081',
          phone_number: '7434329',
          extension: ''
        },
        first_name: 'T1 First Name',
        last_name: 'T1 Last Name',
        email: 't1@example.com'
      }
    }
  };


  const withT1Only = {
    reseller_tiers: 't1',
    asset_external_id: 'asset_ext_id',
    hub_id: 'HB-000',
    connection_id: 'CT-0000-0000',
    ...t1In,
    ...custIn,
    items: [
      { item_id: 'PRD-000-000-000-0001', quantity: 30 },
      { item_id: 'PRD-000-000-000-0002', quantity: 10 },
    ],
    params: [
      {
        param_id: 'param_a',
        value: 'param_a_value'
      }
    ]
  };
  const withT1OnlyExpected = {
    type: 'purchase',
    asset:
    {
      external_id: 'asset_ext_id',
      external_uid: expect.anything(),
      connection: { id: 'CT-0000-0000' },
      items:
        [{ id: 'PRD-000-000-000-0001', quantity: 30 },
        { id: 'PRD-000-000-000-0002', quantity: 10 }],
      params:
        [{
          id: 0,
          value: { param_id: 'param_a', value: 'param_a_value' }
        }],
      tiers:
      {
        tier1: t1Out,
        customer: custOut,
      }
    }
  };
  it('createAssetPurchaseRequest connection found', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn(() => 'CT-0000-0000'),
      createRequest: mockedFn
    };
    await createAssetPurchaseRequest(client, withT1Only);
    expect(mockedFn).toHaveBeenCalledWith(withT1OnlyExpected);
  });
  it('createAssetPurchaseRequest connection not found', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn(() => undefined),
      createRequest: mockedFn
    };
    await expect(createAssetPurchaseRequest(client, withT1Only)).rejects.toThrow();
  });

  const changeReqWithoutExtAttr = {
    asset_id: 'AS-000-000',
    items: [
      {
        item_id: 'PRD-000-0001',
        quantity: 10
      }
    ]
  };
  const changeReqWithoutExtAttrExpected = {
    type: 'change',
    asset: {
      id: 'AS-000-000',
      items: [
        {
          id: 'PRD-000-0001',
          quantity: 10
        }
      ]
    }
  };
  it('createAssetChangeRequest', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createRequest: mockedFn
    };
    await createAssetChangeRequest(client, changeReqWithoutExtAttr);
    expect(mockedFn).toHaveBeenCalledWith(changeReqWithoutExtAttrExpected);
  });
  it.each([
    ['createAssetSuspendRequest', { asset_id: 'AS-000-000' }, 'suspend', createAssetSuspendRequest],
    ['createAssetSuspendRequest', { asset_id: 'AS-000-000' }, 'resume', createAssetResumeRequest],
    ['createAssetSuspendRequest', { asset_id: 'AS-000-000' }, 'cancel', createAssetCancelRequest],
  ])('%s', async (testcase, data, type, fn) => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createRequest: mockedFn
    };
    await fn(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      type,
      asset: {
        id: 'AS-000-000'
      }
    });  
  });
  it('createAssetRequestFromOrder', async () => {
    const data = {
      asset_external_id: 'WL6IKB3OZ7',
      hub_id: 'HB-0000-0000',
      items: [
        {
          item_id: 'PRD-407-420-078-0001',
          quantity: 3
        },
        {
          item_id: 'PRD-407-420-078-0002',
          quantity: 0
        },
        {
          item_id: 'PRD-263-744-774-0001',
          quantity: 5
        },
        {
          item_id: 'PRD-111-222-333-0001',
          quantity: 0
        },
        {
          item_id: 'PRD-111-222-333-0002',
          quantity: 0
        },
      ],
      ...t1In,
      ...custIn,
    };
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn().mockReturnValue('CT-0000-0000'),
      createRequest: mockedFn
    };
    Directory.prototype = {
      getAssetsByProductIdExternalId: jest.fn((prodId, extId) => {
        if (prodId === 'PRD-407-420-078' && extId === 'WL6IKB3OZ7') {
          return [{
            id: 'AS-0126-3396-8831',
            items: [
              {
                id: 'PRD-407-420-078-0002',
                quantity: 8
              },
              {
                id: 'PRD-407-420-078-0001',
                quantity: 10
              }
            ]
          }];
        } else if (prodId === 'PRD-111-222-333' && extId === 'WL6IKB3OZ7') {
          return [{
            id: 'AS-1111-2222-3333',
            items: [
              {
                id: 'PRD-111-222-333-0002',
                quantity: 8
              },
              {
                id: 'PRD-111-222-333-0001',
                quantity: 10
              }
            ]
          }];
        } else if (prodId === 'PRD-263-744-774' && extId === 'WL6IKB3OZ7') {
          return [];
        }
      })
    }
    await createAssetRequestFromOrder(client, data);
    expect(mockedFn).toHaveBeenCalledTimes(3);
    expect(mockedFn.mock.calls[0][0]).toEqual({
      type: 'change',
      asset: {
        id: 'AS-0126-3396-8831',
        items: expect.anything()
      }
    });
    expect(mockedFn.mock.calls[0][0].asset.items).toEqual(expect.arrayContaining([
      {
        id: 'PRD-407-420-078-0002',
        quantity: 0
      },
      {
        id: 'PRD-407-420-078-0001',
        quantity: 3
      }
    ]));
    expect(mockedFn.mock.calls[1][0]).toEqual({
      type: 'purchase',
      asset: {
        external_id: 'WL6IKB3OZ7',
        external_uid: expect.anything(),
        connection: { id: 'CT-0000-0000' },
        items: [{ id: 'PRD-263-744-774-0001', quantity: 5 }],
        params: [],
        tiers: {
          tier1: {
            name: 'T1 Company',
            external_id: '2',
            external_uid: expect.anything(),
            contact_info: {
              address_line1: 'T1 Address 1',
              address_line2: 'T1 Address 2',
              postal_code: '08010',
              city: 'Barcelona',
              state: 'Barcelona',
              country: 'ES',
              contact: {
                phone_number: {
                  country_code: '+39',
                  area_code: '081',
                  phone_number: '7434329',
                  extension: ''
                },
                first_name: 'T1 First Name',
                last_name: 'T1 Last Name',
                email: 't1@example.com'
              }
            }
          },
          customer: {
            name: 'Cust Company',
            external_id: undefined,
            external_uid: expect.anything(),
            contact_info: {
              address_line1: 'Cust Address 1',
              address_line2: 'Cust Address 2',
              postal_code: '08010',
              city: 'Barcelona',
              state: 'Barcelona',
              country: 'ES',
              contact: {
                phone_number: {},
                first_name: 'Cust First Name',
                last_name: 'Cust Last Name',
                email: 't1@example.com'
              }
            }
          }
        }
      }
    });
    expect(mockedFn.mock.calls[2][0]).toEqual({ type: 'cancel', asset: { id: 'AS-1111-2222-3333' } });
  });


  it('createAssetRequestFromOrder (skip)', async () => {
    const data = {
      asset_external_id: 'WL6IKB3OZ7',
      hub_id: 'HB-0000-0000',
      items: [
        {
          item_id: 'PRD-407-420-078-0001',
          quantity: 3
        },
      ],
      ...t1In,
      ...custIn,
    };
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn().mockReturnValue(null),
      createRequest: mockedFn
    };
    Directory.prototype = {
      getAssetsByProductIdExternalId: jest.fn().mockReturnValue([]),
    }
    const results = await createAssetRequestFromOrder(client, data);
    expect(results).toBeInstanceOf(Object);
    expect(results).toHaveProperty('skipped');
    expect(results.skipped).toBeInstanceOf(Array);
    expect(results.skipped[0]).toEqual({
      item_id: 'PRD-407-420-078-0001',
      quantity: 3,
      product_id: 'PRD-407-420-078',
      asset_external_id: 'WL6IKB3OZ7',
      request_type: 'purchase',
      reason: expect.anything(),      
    });
  });
});
