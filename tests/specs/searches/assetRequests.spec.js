/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/assetRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../../lib/connect/api/assetRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('asset requests', async () => {
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
    await appTester(App.searches.search_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
});