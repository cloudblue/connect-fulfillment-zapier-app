/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


const {
  buildPurchaseRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
} = require('../../../../../lib/connect/api/helpers/builder');

describe('helpers.builder', () => {


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


  const t2In = {
    t2_company_name: 'T2 Company',
    t2_external_id: '2',
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

  const t2Out = {
    name: 'T2 Company',
    external_id: '2',
    external_uid: expect.anything(),
    contact_info:
    {
      address_line1: 'T2 Address 1',
      address_line2: 'T2 Address 2',
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
        first_name: 'T2 First Name',
        last_name: 'T2 Last Name',
        email: 't2@example.com'
      }
    }
  };

  const withT1Only = {
    reseller_tiers: 't1',
    asset_external_id: 'asset_ext_id',
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

  const withT2T1 = {
    reseller_tiers: 't2t1',
    asset_external_id: 'asset_ext_id',
    connection_id: 'CT-0000-0000',
    ...t2In,
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
  const withT2T1Expected = {
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
        tier2: t2Out,
        tier1: t1Out,
        customer: custOut,
      }
    }
  };

  const withoutParams = {
    reseller_tiers: 't1',
    asset_external_id: 'asset_ext_id',
    connection_id: 'CT-0000-0000',
    ...t1In,
    ...custIn,
    items: [
      { item_id: 'PRD-000-000-000-0001', quantity: 30 },
      { item_id: 'PRD-000-000-000-0002', quantity: 10 },
    ],
    params: []
  };
  const withoutParamsExpected = {
    type: 'purchase',
    asset:
    {
      external_id: 'asset_ext_id',
      external_uid: expect.anything(),
      connection: { id: 'CT-0000-0000' },
      items:
        [{ id: 'PRD-000-000-000-0001', quantity: 30 },
        { id: 'PRD-000-000-000-0002', quantity: 10 }],
      params: [],
      tiers:
      {
        tier1: t1Out,
        customer: custOut,
      }
    }
  };

  const withoutItems = {
    reseller_tiers: 't1',
    asset_external_id: 'asset_ext_id',
    connection_id: 'CT-0000-0000',
    ...t1In,
    ...custIn,
    items: [],
    params: []
  };
  const withoutItemsExpected = {
    type: 'purchase',
    asset:
    {
      external_id: 'asset_ext_id',
      external_uid: expect.anything(),
      connection: { id: 'CT-0000-0000' },
      items: [],
      params: [],
      tiers:
      {
        tier1: t1Out,
        customer: custOut,
      }
    }
  };

  it.each([
    ['with tier1 only', withT1Only, withT1OnlyExpected],
    ['with tier2 + tier1', withT2T1, withT2T1Expected],
    ['without params', withoutParams, withoutParamsExpected],
    ['without items', withoutItems, withoutItemsExpected],
  ])('buildPurchaseRequest %s', (testcase, data, expected) => {
    expect(buildPurchaseRequest(data)).toEqual(expected);
  });

  const changeReqWithExtAttr = {
    asset_id: 'AS-000-000',
    items: [
      {
        item_id: 'PRD-000-0001',
        quantity: 10
      }
    ],
    external_attributes: [
      {
        param_id: 'param_a',
        value: 'value'
      }
    ]
  };
  const changeReqWithExtAttrExpected = {
    type: 'change',
    asset: {
      id: 'AS-000-000',
      items: [
        {
          id: 'PRD-000-0001',
          quantity: 10
        }
      ],
      external_attributes: [
        {
          id: 'param_a',
          value: 'value'
        }
      ]
    }
  };

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

  it.each([
    ['with external attributes', changeReqWithExtAttr, changeReqWithExtAttrExpected],
    ['without external attributes', changeReqWithoutExtAttr, changeReqWithoutExtAttrExpected],
  ])('buildChangeRequest %s', (testcase, data, expected) => {
    expect(buildChangeRequest(data)).toEqual(expected);
  });

  const suspendWithExtAttr = {
    asset_id: 'AS-000-000',
    external_attributes: [
      {
        param_id: 'param_a',
        value: 'value'
      }
    ]
  };
  const suspendWithExtAttrExpected = {
    type: 'suspend',
    asset: {
      id: 'AS-000-000',
      external_attributes: [
        {
          id: 'param_a',
          value: 'value'
        }
      ]
    }
  };
  const suspendWithoutExtAttr = {
    asset_id: 'AS-000-000'
  };
  const suspendWithoutExtAttrExpected = {
    type: 'suspend',
    asset: {
      id: 'AS-000-000'
    }
  };
  it.each([
    ['with external attributes', suspendWithExtAttr, suspendWithExtAttrExpected],
    ['without external attributes', suspendWithoutExtAttr, suspendWithoutExtAttrExpected],
  ])('buildSuspendResumeCancelRequest returns a suspend request', (testcase, data, expected) => {
    expect(buildSuspendResumeCancelRequest(data, 'suspend')).toEqual(expected);
  });
});
