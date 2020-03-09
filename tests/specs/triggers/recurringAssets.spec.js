/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/recurringAssets', () => {
  return {
    listRecurringAssets: jest.fn(),
  }
});

const {
  listRecurringAssets,
} = require('../../../lib/connect/api/recurringAssets');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new recurring asset', async () => {
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
    listRecurringAssets.mockReturnValue([]);
    await appTester(App.triggers.new_recurring_assets.operation.perform, bundle);
    expect(listRecurringAssets).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-events.created.at');    
  });
  it('new or updated recurring assets', async () => {
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
    listRecurringAssets.mockReturnValue([{id: 'AS-0000', events: { updated: { at: 'test' } } }]);
    const response = await appTester(App.triggers.new_updated_recurring_assets.operation.perform, bundle);
    expect(listRecurringAssets).toHaveBeenCalledWith(expect.anything(), bundle.inputData, null);    
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('request_id');
    expect(response[0].request_id).toEqual('AS-0000');
    expect(response[0].id).toEqual('fb2296e6c3b9343a5f157d7d2ce878902c20cef1');
  });
});
