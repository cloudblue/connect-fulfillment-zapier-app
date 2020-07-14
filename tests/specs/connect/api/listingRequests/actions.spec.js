/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

jest.mock('@cloudblueconnect/connect-javascript-sdk', () => {
  return {
    ConnectClient: jest.fn(),
    Listings: jest.fn(),
  }
});

const { ConnectClient, Listings } = require('@cloudblueconnect/connect-javascript-sdk');


const {
  searchListingRequests, changeListingRequestStatus,
} = require('../../../../../lib/connect/api/listingRequests/actions');


describe('listingsRequests.actions', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('search Listing Requests', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Listings.prototype = {
      searchListingRequests: mockedFn
    };
    const data = {
      records_per_page: 100,
      type: 'new',
      state: 'deploying',
      product_id: 'PRD-140-766-671'
    };
    await searchListingRequests (client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      'type': 'new',
      'product.id': 'PRD-140-766-671',
      'limit': 100,
      'offset': 0
    });
  });

  it('search Listing Requests with dates', async () => {
    const mockedFn = jest.fn();
    mockedFn.mockReturnValue([]);
    Listings.prototype = {
      searchListingRequests: mockedFn
    };
    const data = {
      records_per_page: 100,
      created_before: '2019-12-05T09:11:22+00:00',
      created_after: '2019-12-01T09:11:22+00:00',  
    };
    await searchListingRequests (client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      created: {
        $ge: '2019-12-01T09:11:22.000Z',
        $le: '2019-12-05T09:11:22.000Z'
      },
      limit: 100,
      offset: 0
    });
  });

  it.each([
    ['deploy'],
    ['complete'],
    ['refine'],
    ['cancel'],
    ])('invoke the action %sListingRequest on listings', async (action) => {
    const mockedFn = jest.fn();
    const methodName = `${action}ListingRequest`;
    Listings.prototype = {}
    Listings.prototype[methodName] = mockedFn
    const data = {
      id: 'LST-000-000-000',
      action,
    };
    await changeListingRequestStatus(client, data);
    expect(mockedFn).toHaveBeenCalledWith('LST-000-000-000');
  });
  
  it('Invoke an undefined action of ListingRequest', async () => {
    const data = {
      id: 'LST-000-000-000',
      action: 'unknown',
    };
    await expect(changeListingRequestStatus(client, data)).rejects.toThrow();
  });
});

