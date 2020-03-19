/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/tierAccountRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../../lib/connect/api/tierAccountRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new tier account request', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
        account_type: 'provider',
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([]);
    await appTester(App.triggers.new_tier_account_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-events.created.at');    
  });
  it('new or updated tier account requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
        account_type: 'provider',
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([{id: 'TAR-0000', events: { updated: { at: 'test' } } }]);
    const response = await appTester(App.triggers.new_updated_tier_account_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, null);    
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('request_id');
    expect(response[0].request_id).toEqual('TAR-0000');
    expect(response[0].id).toEqual('fac102413b015887950d18ee31dd23c22c699f28');
  });
});
