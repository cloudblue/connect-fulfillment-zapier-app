/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/listingRequests/actions', () => {
  return {
    changeListingRequestStatus: jest.fn(),
  }
});

const {
  changeListingRequestStatus,
} = require('../../../lib/connect/api/listingRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('change listing requests status', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        'id': 'LSTR-000',
        'action': 'deploy'
      }
    };
    changeListingRequestStatus.mockResolvedValue({});
    await appTester(App.creates.change_state_listing_request.operation.perform, bundle);
    expect(changeListingRequestStatus).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});