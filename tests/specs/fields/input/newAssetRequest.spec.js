/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const mockedGetProductParameters = jest.fn();

jest.mock('../../../../lib/connect/api/misc', () => {
  return {
    getProductParameters: mockedGetProductParameters,
  }
});

const {
  getAssetPurchaseRequestFields,
  getAssetPurchaseRequestFieldsLIS,
} = require('../../../../lib/fields/input/new_asset_request');

const { FIELDS_TIER_2 } = require('../../../../lib/fields/input/tiers');

describe('new asset requests', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  //   fetch.resetMocks();
  // });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS],
  ])('%s return tier2 fields if reseller_tiers === t2t1', async (label, fn) => {
    const bundle = {
      inputData: {
        reseller_tiers: 't2t1',
      }
    }
    const fields = await fn(null, bundle);
    expect(fields).toEqual(expect.arrayContaining(FIELDS_TIER_2));
  });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields, {'PRD-000-000-000-0001': 100},],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS, [{item_id: 'PRD-000-000-000-0001', quantity: 100}],],
  ])('%s call the getProductParameters in form input mode', async (label, fn, items) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
          'PRM-001',
        ],
        items,
      }
    }
    await fn({request: ''}, bundle);
    expect(mockedGetProductParameters).toHaveBeenCalledWith(
      expect.anything(),
      'PRD-000-000-000',
      [
        'PRM-000',
        'PRM-001',
      ],
    );
  });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields, {'PRD-000-000-000-0001': 100},],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS, [{item_id: 'PRD-000-000-000-0001', quantity: 100}],],
  ])('%s renders form fields for parameter of type address in form input mode', async (label, fn, items) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items,
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: 'address',
        name: 'my_address',
        title: 'Address',
        default: {country: 'IT'},
      }
    ]);
    const fields = await fn({request: ''}, bundle);
    expect(fields).toEqual(expect.arrayContaining([
      {
        key: 'my_address_address_line1',
        label: 'Address - Address Line 1',
        required: true,
      },
      {
        key: 'my_address_address_line2',
        label: 'Address - Address Line 2',
        required: false,        
      },
      {
        key: 'my_address_postal_code',
        label: 'Address - Postal Code',
        required: true,        
      },
      {
        key: 'my_address_city',
        label: 'Address - City',
        required: true,        
      },
      {
        key: 'my_address_state',
        label: 'Address - State or Province',
        required: true,        
      },
      {
        key: 'my_address_country',
        label: 'Address - Country',
        required: true,
        helpText: 'Please use Alpha-2 code.',
        default: 'IT', 
      },
    ]));
  });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields, {'PRD-000-000-000-0001': 100},],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS, [{item_id: 'PRD-000-000-000-0001', quantity: 100}],],
  ])('%s renders form fields for parameter of type address in form input mode', async (label, fn, items) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items,
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: 'phone',
        name: 'my_phone',
        title: 'Phone',
        default: {country: 'IT'},
      }
    ]);
    const fields = await fn({request: ''}, bundle);
    expect(fields).toEqual(expect.arrayContaining([
      {
        key: 'my_phone_country_code',
        label: 'Phone - Country Code',
        required: true,
        default: '+39',
      },
      {
        key: 'my_phone_phone_number',
        label: 'Phone - Phone Number',
        required: true,        
      },
    ]));
  });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields, {'PRD-000-000-000-0001': 100},],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS, [{item_id: 'PRD-000-000-000-0001', quantity: 100}],],
  ])('%s renders form fields for parameter of type subdomain in form input mode', async (label, fn, items) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items,
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: 'subdomain',
        name: 'my_subdomain',
        title: 'Subdomain',
        constraints: {
          choices: [
            {
              label: 'example.com',
              value: 'example.com',
            },
            {
              label: 'paipai.net',
              value: 'paipai.net',
              default: true,
            },            
          ],
        },
      },
    ]);

    const fields = await fn({request: ''}, bundle);
    expect(fields).toEqual(expect.arrayContaining([
      {
        key: 'my_subdomain_subdomain',
        label: 'Subdomain - Subdomain',
        required: true,
      },
      {
        key: 'my_subdomain_domain',
        label: 'Subdomain - Domain',
        choices: {
          'example.com': 'example.com',
          'paipai.net': 'paipai.net',
        }    ,
        default: 'paipai.net',
        required: true,
      },
    ]));
  });
  it.each([
    ['getAssetPurchaseRequestFields', getAssetPurchaseRequestFields, {'PRD-000-000-000-0001': 100},],
    ['getAssetPurchaseRequestFieldsLIS', getAssetPurchaseRequestFieldsLIS, [{item_id: 'PRD-000-000-000-0001', quantity: 100}],],
  ])('%s renders form fields for unstructured parameter (type "others") in form input mode', async (label, fn, items) => {  
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items,
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: 'text',
        name: 'my_field',
        title: 'Field',
      },
    ]);

    const fields = await fn({request: ''}, bundle);
    const field = _.filter(fields, (f) => f.key === 'my_field');
    expect(field).toEqual([
      {
        key: 'my_field',
        label: 'Field',
        required: true,
      }
    ]);
  });
  it.each([
    ['checkbox', true],
    ['choice', false],
    ['dropdown', false],
  ])('getAssetPurchaseRequestFields renders form fields for parameter of type %s in form input mode', async (type, list) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items: {'PRD-000-000-000-0001': 100},
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: type,
        name: 'my_field',
        title: 'Field',
        constraints: {
          choices: [
            {
              label: 'First',
              value: 'first',
              default: true,
            },
            {
              label: 'Second',
              value: 'second',
            },
          ],
        },
      },
    ]);
    
    const expected = [{
      key: 'my_field',
      label: 'Field',
      choices: {
        first: 'First',
        second: 'Second',
      },
      default: 'first',
      list,
    }];
    const fields = await getAssetPurchaseRequestFields({request: ''}, bundle);
    const checkboxField = _.filter(fields, (f) => f.key === 'my_field');
    expect(checkboxField).toEqual(expected);
  });
  it.each([
    ['checkbox', true],
    ['choice', false],
    ['dropdown', false],
  ])('getAssetPurchaseRequestFieldsLIS renders form fields for parameter of type %s in form input mode', async (type, list) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        params_input_mode: 'form',
        ordering_parameter_ids: [
          'PRM-000',
        ],
        items: [{item_id: 'PRD-000-000-000-0001', quantity: 100}],
      }
    }
    mockedGetProductParameters.mockResolvedValue([
      {
        id: 'PRM-000',
        type: type,
        name: 'my_field',
        title: 'Field',
        constraints: {
          choices: [
            {
              label: 'First',
              value: 'first',
              default: true,
            },
            {
              label: 'Second',
              value: 'second',
            },
          ],
        },
      },
    ]);
    
    const expected = [{
      key: 'my_field',
      label: 'Field',
      choices: {
        first: 'First',
        second: 'Second',
      },
      default: 'first',
      list,
    }];
    const fields = await getAssetPurchaseRequestFieldsLIS({request: ''}, bundle);
    const checkboxField = _.filter(fields, (f) => f.key === 'my_field');
    expect(checkboxField).toEqual(expected);
  });
});
