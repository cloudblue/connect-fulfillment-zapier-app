/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  const mockedFn = jest.fn();

  mockedFn.mockImplementation((endpoint, key, adapter) => {
    return {
      products: {
        parameters: (productId) => {
          return {search: mockedSearchParams}
        },
      },
      tierConfigs: {
        get: jest.fn().mockReturnValue({product: {id: 'PRD-000'}}),
      },
      addBeforeRequestHook: jest.fn(),
    }
  });
  return {
    ConnectClient: mockedFn,
    AbstractHttpAdapter: jest.fn(),
    Fulfillment: jest.fn(),
    Inventory: jest.fn(),
  }
});

const _ = require('lodash');

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const mockedGetProductParameters = jest.fn();

jest.mock('../../../../lib/connect/api/misc', () => {
  return {
    ...jest.requireActual('../../../../lib/connect/api/misc'),
    getProductParameters: mockedGetProductParameters,
  }
});

const {
  getTCRParametersFields,
} = require('../../../../lib/fields/input/new_tier_config_request');


describe('create tier config request', () => {
  beforeAll(() => {
    // const mockedFn = jest.fn();
    // Fulfillment.prototype = {
    //   getRequest: mockedFn,
    // };
    // mockedFn.mockReturnValue({asset: {product: {id: 'PRD-000'}}});
  });
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });
  it('returns config_id and params fields in raw input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-000-000-000',
        params_input_mode: 'raw',
      }
    }
    const fields = await getTCRParametersFields({request: ''}, bundle);
    expect(fields).toEqual(expect.arrayContaining([
      {
        key: 'config_id',
        label: 'Tier Configuration ID',
        required: true,
      },
      {
        key: 'params_input_mode',
        label: 'Parameters Input Mode',
        choices: {
          form: 'Form Mode',
          raw: 'Raw Mode',
        },
        required: true,
        helpText: 'Choose the input mode for parameters.',
        altersDynamicFields: true,
        default: 'raw',
      },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Value',
      },
    ]));
  });


  it('call the getProductParameters in form input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
          'PRM-001',
        ],
      }
    }
    await getTCRParametersFields({request: ''}, bundle);
    expect(mockedGetProductParameters).toHaveBeenCalledWith(
      expect.anything(),
      'PRD-000',
      [
        'PRM-000',
        'PRM-001',
      ],
    );
  });
  it('renders form fields for parameter of type address in form input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
        ],
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
    const fields = await getTCRParametersFields({request: ''}, bundle);
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
  it('renders form fields for parameter of type address in form input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
        ],
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
    const fields = await getTCRParametersFields({request: ''}, bundle);
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
  it('enders form fields for parameter of type subdomain in form input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
        ],
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

    const fields = await getTCRParametersFields({request: ''}, bundle);
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
  it('renders form fields for unstructured parameter (type "others") in form input mode', async () => {  
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
        ],
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

    const fields = await getTCRParametersFields({request: ''}, bundle);
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
  ])('renders form fields for parameter of type %s in form input mode', async (type, list) => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        config_id: 'TC-0000',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
        ],
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
    const fields = await getTCRParametersFields({request: ''}, bundle);
    const checkboxField = _.filter(fields, (f) => f.key === 'my_field');
    expect(checkboxField).toEqual(expected);
  });
});
