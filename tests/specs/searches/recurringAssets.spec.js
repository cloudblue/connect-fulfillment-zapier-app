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

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('recurring assets', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    listRecurringAssets.mockReturnValue([]);
    await appTester(App.searches.search_recurring_assets.operation.perform, bundle);
    expect(listRecurringAssets).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-events.created.at');    
  });
});