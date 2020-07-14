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
  getFillAssetRequestParametersFields,
} = require('../../../../lib/fields/input/fill_asset_request_parameters');


describe('fill asset request parameters', () => {
  beforeAll(() => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      getRequest: mockedFn,
    };
    mockedFn.mockReturnValue({asset: {product: {id: 'PRD-000-000-000'}}});
  });
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });
  it('returns request_id and params fields in raw input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        request_id: 'PR-0000-0000-0000-001',
        params_input_mode: 'raw',
      }
    }
    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
    expect(fields).toEqual(expect.arrayContaining([
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
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
        helpText: 'Provide the list of parameters to set value, first field is to specify the '
          + 'parameter id as seen on CloudBlue Connect portals, the second field is to provide '
          + 'it\'s value. Please note that both can be populated from previous steps in the Zap.',
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
        request_id: 'PR-0000-0000-0000-001',
        params_input_mode: 'form',
        parameter_ids: [
          'PRM-000',
          'PRM-001',
        ],
      }
    }
    await getFillAssetRequestParametersFields({request: ''}, bundle);
    expect(mockedGetProductParameters).toHaveBeenCalledWith(
      expect.anything(),
      'PRD-000-000-000',
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
        request_id: 'PR-0000-0000-0000-001',
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
    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
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
        request_id: 'PR-0000-0000-0000-001',
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
    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
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
  it('%s renders form fields for parameter of type subdomain in form input mode', async () => {
    const bundle = {
      authData: {
        api_key: 'key',
        endpoint: 'http://example.com',
      },
      inputData: {
        request_id: 'PR-0000-0000-0000-001',
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

    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
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
        request_id: 'PR-0000-0000-0000-001',
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

    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
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
        request_id: 'PR-0000-0000-0000-001',
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
    const fields = await getFillAssetRequestParametersFields({request: ''}, bundle);
    const checkboxField = _.filter(fields, (f) => f.key === 'my_field');
    expect(checkboxField).toEqual(expected);
  });
});
