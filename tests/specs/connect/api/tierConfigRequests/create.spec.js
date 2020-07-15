/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */


jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    Directory: jest.fn(),
    Fulfillment: jest.fn(),
  }
});

jest.mock('../../../../../lib//connect/api/helpers/lookups', () => {
  return {
    ...jest.requireActual('../../../../../lib/connect/api/helpers/lookups'),
    getProductParameters: jest.fn().mockResolvedValue([
      {
        id: 'PRM-000',
        type: 'address',
        name: 'my_address',
        title: 'Address',
      },
      {
        id: 'PRM-001',
        type: 'subdomain',
        name: 'my_subdomain',
        title: 'Subdomain',
      },
      {
        id: 'PRM-002',
        type: 'phone',
        name: 'my_phone',
        title: 'Phone',
        default: {
          country: 'IT',
        },
      },
      {
        id: 'PRM-004',
        type: 'text',
        name: 'my_text',
        title: 'Text',
      },
      {
        id: 'PRM-003',
        type: 'checkbox',
        name: 'my_checkbox',
        title: 'Checkbox',
        constraints: {
          choices: [
            {
              label: 'First',
              value: 'first',
            },
            {
              label: 'Second',
              value: 'second',
            }
          ]
        },
      },
    ]),
  }
});


const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { ConnectClient } = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');

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
    client.tierConfigs.get = jest.fn().mockReturnValue({product: {id: 'PRD-000'}});
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params: {
        param_a: 'value_a',
        param_b: '{"a": "value"}',
      }
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [
      { id: 'param_a', value: 'value_a' },
      { id: 'param_b', structured_value: {a: 'value'} },
    ]);
  });

  it('createUpdateTierConfigRequest with params from form', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createUpdateTierConfigRequest: mockedFn,
    };
    client.tierConfigs.get = jest.fn().mockReturnValue({product: {id: 'PRD-000'}});
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params_input_mode: 'form',
      my_address_address_line1: 'line1',
      my_address_address_line2: 'line2',
      my_address_postal_code: '00000',
      my_address_state: 'state',
      my_address_city: 'city',
      my_address_country: 'country',
      my_subdomain_subdomain: 'test',
      my_subdomain_domain: 'example.com',
      my_phone_country_code: '+39',
      my_phone_phone_number: '0817434329',
      my_checkbox: ['first', 'second'],
      my_text: 'hello world',
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [
      {
        id: 'my_address',
        structured_value: {
          address_line1: 'line1',
          address_line2: 'line2',
          postal_code: '00000',
          state: 'state',
          city: 'city',
          country: 'country',
        },
      },
      {
        id: 'my_subdomain',
        value: 'test.example.com',
      },
      {
        id: 'my_phone',
        structured_value: {
          country_code: '+39',
          area_code: '081',
          phone_number: '7434329',
          extension: '',
        },
      },
      {
        id: 'my_text',
        value: 'hello world',
      },
      {
        id: 'my_checkbox',
        structured_value: {
          first: true,
          second: true,
        },
      },
    ]);
  });




  it('createUpdateTierConfigRequest with params array', async () => {
    const mockedFn = jest.fn();
    Fulfillment.prototype = {
      createUpdateTierConfigRequest: mockedFn,
    };
    client.tierConfigs.get = jest.fn().mockReturnValue({product: {id: 'PRD-000'}});
    await createUpdateTierConfigRequest(client, {
      config_id: 'TC-000',
      params: [
        {
          id: 'param_a',
          value: 'value_a',
        },
        {
          id: 'param_b',
          value: '{"a": "value"}',
        },
      ]
    });
    expect(mockedFn).toHaveBeenCalledWith('TC-000', [
      { id: 'param_a', value: 'value_a' },
      { id: 'param_b', structured_value: {a: 'value'} },
    ]);
  });
});