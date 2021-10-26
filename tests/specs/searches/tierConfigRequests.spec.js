/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/tierConfigRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../../lib/connect/api/tierConfigRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('tier config requests', async () => {
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
    await appTester(App.searches.search_tier_config_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
});