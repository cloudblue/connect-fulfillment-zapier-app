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
      }
    }
  });
  return {
    ConnectClient: mockedFn,
    AbstractHttpAdapter: jest.fn()
  }
});

const { HttpError } = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('passes authentication (prod) and returns account info', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ'
      }
    };
    
    const response = await appTester(App.authentication.test, bundle);
      expect(response).toBeInstanceOf(Object);
      expect(response).toHaveProperty('account_info');
      expect(response.account_info).toEqual('Vendor (VA-000)');
  });
  it('passes authentication (!=prod) and returns account info', async () => {
    mockedSearchAccount.mockReturnValue([{
      id: 'VA-000',
      name: 'Vendor',
      type: 'vendor'
    }]);
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ@https://api.cnct.tech/public/v1'
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
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.J1PdKDBbc1IP1o3d1Nix9eQYHmyoKHK5DSFb6KwS7IQ@https://api.cnct.tech/public/v1/'
      }
    };
    const response = await appTester(App.authentication.test, bundle);
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('account_info');
    expect(response.account_info).toEqual('Vendor (VA-000) [https://api.cnct.tech/public/v1]');
  });

  it('fails on bad auth token', async () => {
    mockedSearchAccount.mockRejectedValue(new HttpError(401, 'Unauthorized'));
    const bundle = {
      authData: {
        auth_token: 'fake',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    await expect(appTester(App.authentication.test, bundle)).rejects.toThrow(Error);
  });

  it('fails on bad api key', async () => {
    mockedSearchAccount.mockRejectedValue(new HttpError(401, 'Unauthorized'));
    const bundle = {
      authData: {
        auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNVLTAwMC0wMDAtMDAwIiwia2V5IjoiMmYwM2JhZWNjMDUzMWIzMTM3NDA0ZTRkNTFjMDg2NGIzYWUwODg4NSIsInR5cGUiOiJ6YXBpZXIifQ.3OY8IHyO-hxSe-PR1W3FjfSeRe0j682Jn8lskLkAplk',
        endpoint: process.env.CONNECT_ENDPOINT
      }
    };
    await expect(appTester(App.authentication.test, bundle)).rejects.toThrow();
  });
});