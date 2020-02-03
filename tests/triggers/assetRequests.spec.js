/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../lib/connect/api/assetRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../lib/connect/api/assetRequests/actions');


const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([]);
    await appTester(App.triggers.new_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
  it('new or updated requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([{id: 'PR-000', updated: 'test'}]);
    const response = await appTester(App.triggers.new_updated_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, null);    
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('request_id');
    expect(response[0].request_id).toEqual('PR-000');
    expect(response[0].id).toEqual('7e383bc8b5a23f23b2ca73e77fc093d2adf2d1ee');
  });
});
