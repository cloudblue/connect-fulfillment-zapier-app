/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/misc', () => {
  return {
    searchTierConfigs: jest.fn(),
  }
});

const {
  searchTierConfigs,
} = require('../../../lib/connect/api/misc');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('tier configurations', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchTierConfigs.mockReturnValue([]);
    await appTester(App.searches.search_tier_configs.operation.perform, bundle);
    expect(searchTierConfigs).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});