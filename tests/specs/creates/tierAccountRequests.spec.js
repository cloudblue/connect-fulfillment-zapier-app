/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/tierAccountRequests/actions', () => {
  return {
    acceptRequest: jest.fn(),
    ignoreRequest: jest.fn(),
  }
});

const {
  acceptRequest,
  ignoreRequest,
} = require('../../../lib/connect/api/tierAccountRequests/actions');

jest.mock('../../../lib/connect/api/tierAccountRequests/create', () => {
  return {
    createTierAccountRequest: jest.fn(),
  }
});

const {
  createTierAccountRequest,
} = require('../../../lib/connect/api/tierAccountRequests/create');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('tierAccountRequests.creates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it.each([
    ['create_tier_account_request', createTierAccountRequest],
    ['accept_tier_account_request', acceptRequest],
    ['ignore_tier_account_request', ignoreRequest],
  ])('%s', async (testcase, fn) => {

    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    fn.mockReturnValue({});
    await appTester(App.creates[testcase].operation.perform, bundle);
    expect(fn).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});