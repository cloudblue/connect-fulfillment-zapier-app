/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');
zapier.tools.env.inject();

const mockedSearchAccount = jest.fn();

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  const mockedFn = jest.fn();
  mockedFn.mockImplementation((endpoint, key, adapter) => {
    return {
      accounts: {
        search: mockedSearchAccount,
      },
      addBeforeRequestHook: jest.fn(),
    }
  });
  return {
    ConnectClient: mockedFn,
    AbstractHttpAdapter: jest.fn()
  }
});

const { HttpError } = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

const contentTypeJson = { 'content-type': 'application/json' };
const tokenResponse = JSON.stringify({token: 'ApiKey SU-000-000-000:6a5d6b1f5b823ec766207c6c39c33140f904f552'});

describe('authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });
  it('passes authentication  with handle (prod) and returns account info', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    const bundle = {
      authData: {
        auth_token: 'dd49658e72d30c19b7547730efb2c3cf12483fa6'
      }
    };
    fetch.mockResponseOnce(tokenResponse, { status: 200, headers: contentTypeJson });
    const response = await appTester(App.authentication.test, bundle);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('account_info');
      expect(response.account_info).toEqual('Vendor (VA-000)');
  });
  it('passes authentication  with ApiKey (prod) and returns account info', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    const bundle = {
      authData: {
        auth_token: 'ApiKey PTN:ZAPIERe23322c5fc5bca5f4af38d7c7ddb355128ad0ba8865Z'
      }
    };
    const response = await appTester(App.authentication.test, bundle);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('account_info');
      expect(response.account_info).toEqual('Vendor (VA-000)');
  });
  it('passes authentication with handle (!=prod) and returns account info', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    fetch.mockResponseOnce(tokenResponse, { status: 200, headers: contentTypeJson });
    const bundle = {
      authData: {
        auth_token: 'dd49658e72d30c19b7547730efb2c3cf12483fa6@https://api.cnct.tech/public/v1'
      }
    };
    const response = await appTester(App.authentication.test, bundle);
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('account_info');
    expect(response.account_info).toEqual('Vendor (VA-000) [https://api.cnct.tech/public/v1]');
  });
  it('passes authentication (!=prod) and returns account info (trailing slash)', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    fetch.mockResponseOnce(tokenResponse, { status: 200, headers: contentTypeJson });
    const bundle = {
      authData: {
        auth_token: 'dd49658e72d30c19b7547730efb2c3cf12483fa6@https://api.cnct.tech/public/v1/'
      }
    };
    const response = await appTester(App.authentication.test, bundle);
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('account_info');
    expect(response.account_info).toEqual('Vendor (VA-000) [https://api.cnct.tech/public/v1]');
  });

  it('fails on bad ApiKey', async () => {
    mockedSearchAccount.mockRejectedValue(new HttpError(401, 'Unauthorized'));
    const bundle = {
      authData: {
        auth_token: 'ApiKey fake',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    
    await expect(appTester(App.authentication.test, bundle)).rejects.toThrow(Error);
  });

  it('fails on bad handle', async () => {
    mockedSearchAccount.mockRejectedValue(new HttpError(401, 'Unauthorized'));
    const bundle = {
      authData: {
        auth_token: 'dd49658e72d30c19b7547730efb2c3cf12483fa6',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    fetch.mockResponseOnce({}, { status: 400, headers: contentTypeJson });
    await expect(appTester(App.authentication.test, bundle)).rejects.toThrow();
  });
});