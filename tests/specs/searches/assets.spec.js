/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/misc', () => {
  return {
    searchAssets: jest.fn(),
  }
});

const {
  searchAssets,
} = require('../../../lib/connect/api/misc');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('assets', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchAssets.mockReturnValue([]);
    await appTester(App.searches.search_assets.operation.perform, bundle);
    expect(searchAssets).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});