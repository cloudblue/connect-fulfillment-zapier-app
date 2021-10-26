/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/billingRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../../lib/connect/api/billingRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new billing request', async () => {
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
    await appTester(App.triggers.new_billing_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-events.created.at');    
  });
  it('new or updated billing requests', async () => {
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
    listRequests.mockReturnValue([{id: 'BRP-0000', events: { updated: { at: 'test' } } }]);
    const response = await appTester(App.triggers.new_updated_billing_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, null);    
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('request_id');
    expect(response[0].request_id).toEqual('BRP-0000');
    expect(response[0].id).toEqual('eb2f4dcc77d0c0df6b2f98063f9bd5ec67a14a19');
  });
});
