/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/tierConfigRequests/actions', () => {
  return {
    approveRequest: jest.fn(),
    updateRequestParameters: jest.fn(),
    inquireRequest: jest.fn(),
    failRequest: jest.fn(),
  }
});

const {
  approveRequest,
  updateRequestParameters,
  inquireRequest,
  failRequest,
} = require('../../../lib/connect/api/tierConfigRequests/actions');

jest.mock('../../../lib/connect/api/tierConfigRequests/create', () => {
  return {
    createUpdateTierConfigRequest: jest.fn(),
  }
});

const {
  createUpdateTierConfigRequest,
} = require('../../../lib/connect/api/tierConfigRequests/create');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('tierConfigRequests.creates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it.each([
    ['approve_tier_config_request', approveRequest],
    ['create_update_tier_config_request', createUpdateTierConfigRequest],
    ['create_update_tier_config_request_lis', createUpdateTierConfigRequest],
    ['fill_tier_params', updateRequestParameters],
    ['fill_tier_params_lis', updateRequestParameters],
    ['inquire_tier_config_request', inquireRequest],
    ['inquire_tier_config_request_lis', inquireRequest],
    ['fail_tier_config_request', failRequest],
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