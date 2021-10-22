/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require("lodash");

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Directory: jest.fn(),
    Fulfillment: jest.fn(),
  }
});

jest.mock('../../../../../lib/connect/api/helpers/lookups', () => {
    return {
        lookupTierByExternalId: jest.fn(),
        lookupAssetByProductIdExternalId: jest.requireActual('../../../../../lib/connect/api/helpers/lookups').lookupAssetByProductIdExternalId,
        lookupConnectionByProductHub: jest.requireActual('../../../../../lib/connect/api/helpers/lookups').lookupConnectionByProductHub,
    }
  });

const { lookupTierByExternalId } = require('../../../../../lib/connect/api/helpers/lookups');   
const { ConnectClient, Fulfillment, Directory } = require('@cloudblueconnect/connect-javascript-sdk');

const {
  createAssetPurchaseRequest,
  createAssetAdjustmentRequest,
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
    customer_external_id: '2',
    customer_external_uid: '2',    
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
    external_id: '2',
    external_uid: '2',
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
    t1_external_uid: '2',
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

  const t2In = {
    t2_company_name: 'T2 Company',
    t2_external_id: '2',
    t2_external_uid: '2',
    t2_address1: 'T2 Address 1',
    t2_address2: 'T2 Address 2',
    t2_postal_code: '08010',
    t2_city: 'Barcelona',
    t2_state: 'Barcelona',
    t2_country: 'ES',
    t2_first_name: 'T2 First Name',
    t2_last_name: 'T2 Last Name',
    t2_email: 't2@example.com',
    t2_phone: '+390817434329',
  };  

  var t1InNoUid = _.clone(t1In, true);
  t1InNoUid.t1_external_uid = null;

  var t2InNoUid = _.clone(t2In, true);
  t2InNoUid.t2_external_uid = null;

  var custInNoUid = _.clone(custIn, true);
  custInNoUid.customer_external_uid = null;

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

  const withT1OnlyExpectedAdj = {
    type: 'adjustment',
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

  it.each([
    ['createAssetRequestFromOrder', t1In, t2In, custIn ],  
    ['createAssetRequestFromOrder', t1InNoUid, t2In, custIn ],
    ['createAssetRequestFromOrder', t1In, t2InNoUid, custIn ],
    ['createAssetRequestFromOrder', t1In, t2In, custInNoUid ], 
    ['createAssetRequestFromOrder', t1InNoUid, t2InNoUid, custInNoUid ],
  ])('%s', async (testcase, t1data, t2data, custIn) => {
    const data = {
      asset_external_id: 'WL6IKB3OZ7',
      hub_id: 'HB-0000-0000',
      reseller_tiers: 't2t1',
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
      ...t1data,
      ...t2data,
      ...custIn,
    };
    lookupTierByExternalId.mockReturnValue('2');
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
            external_uid: '2',
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
          tier2: {
            name: 'T2 Company',
            external_id: '2',
            external_uid: '2',
            contact_info: {
              address_line1: 'T2 Address 1',
              address_line2: 'T2 Address 2',
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
                first_name: 'T2 First Name',
                last_name: 'T2 Last Name',
                email: 't2@example.com'
              }
            }
          },
          customer: {
            name: 'Cust Company',
            external_id: '2',
            external_uid: '2',
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
it.each([
    ['createAssetAdjustmentRequest', t1In, t2In, custIn ],  
  ])('%s', async (testcase, t1data, t2data, custIn) => {
    const data = {
      asset_external_id: 'WL6IKB3OZ7',
      hub_id: 'HB-0000-0000',
      reseller_tiers: 't2t1',
      items: [
        {
          item_id: 'PRD-263-744-774-0001',
          quantity: 5
        },
      ],
      ...t1data,
      ...t2data,
      ...custIn,
    };
    lookupTierByExternalId.mockReturnValue('2');
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn().mockReturnValue('CT-0000-0000'),
      createRequest: mockedFn
    };
    Directory.prototype = {
      getAssetsByProductIdExternalId: jest.fn((prodId, extId) => {
        if (prodId === 'PRD-263-744-774' && extId === 'WL6IKB3OZ7') {
            return [{
                id: 'AS-1111-2222-3333',
                items: [
                  {
                    id: 'PRD-263-744-774-0001',
                    quantity: 6
                  }
                ]
            }];
        }
      })
    }
    await createAssetAdjustmentRequest(client, data);
    expect(mockedFn.mock.calls[0][0]).toEqual({
      type: 'adjustment',
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
            external_uid: '2',
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
          tier2: {
            name: 'T2 Company',
            external_id: '2',
            external_uid: '2',
            contact_info: {
              address_line1: 'T2 Address 1',
              address_line2: 'T2 Address 2',
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
                first_name: 'T2 First Name',
                last_name: 'T2 Last Name',
                email: 't2@example.com'
              }
            }
          },
          customer: {
            name: 'Cust Company',
            external_id: '2',
            external_uid: '2',
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
  });
  it('createAssetAdjustmentRequest connection not found', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getConnectionIdByProductAndHub: jest.fn(() => undefined),
      createRequest: mockedFn
    };
    await expect(createAssetAdjustmentRequest(client, withT1Only)).rejects.toThrow();
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
