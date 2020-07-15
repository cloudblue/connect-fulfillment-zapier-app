/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/listingRequests/actions', () => {
  return {
    searchListingRequests: jest.fn(),
  }
});

const {
  searchListingRequests,
} = require('../../../lib/connect/api/listingRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('search listing requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchListingRequests.mockReturnValue([]);
    await appTester(App.searches.search_listing_request.operation.perform, bundle);
    expect(searchListingRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});
