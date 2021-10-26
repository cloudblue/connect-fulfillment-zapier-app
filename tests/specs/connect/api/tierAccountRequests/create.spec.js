/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */


jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Directory: jest.fn(),
  }
});

const { ConnectClient, Directory } = require('@cloudblueconnect/connect-javascript-sdk');

const {
  createTierAccountRequest,
} = require('../../../../../lib/connect/api/tierAccountRequests/create');


const accountIn = {
  company_name: 'Cust Company',
  external_id: '00000',
  external_uid: '0fc32894-e771-4f8a-b272-a2dd48d21e6a',
  address1: 'Cust Address 1',
  address2: 'Cust Address 2',
  postal_code: '08010',
  city: 'Barcelona',
  state: 'Barcelona',
  country: 'ES',
  first_name: 'Cust First Name',
  last_name: 'Cust Last Name',
  email: 't1@example.com',
  phone: '+390817434329',
  type: 'update',
};

const accountOut = {
  name: 'Cust Company',
  external_id: '00000',
  external_uid: '0fc32894-e771-4f8a-b272-a2dd48d21e6a',
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
      phone_number: {
        country_code: '+39',
        area_code: '081',
        phone_number: '7434329',
        extension: ''
      },
      first_name: 'Cust First Name',
      last_name: 'Cust Last Name',
      email: 't1@example.com'
    }
  }
};


describe('tierAccountRequests.create', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('createTierAccountRequest', async () => {
    const mockedFn = jest.fn();
    Directory.prototype = {
      createTierAccountRequest: mockedFn,
    };
    await createTierAccountRequest(client, accountIn);
    expect(mockedFn).toHaveBeenCalledWith({
      type: 'update',
      account: accountOut,
    });
  });
});