/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../lib/connect/api/assetRequests/actions', () => {
  return {
    listRequests: jest.fn(),
    approveRequest: jest.fn(),
    updateRequestParameters: jest.fn(),
    inquireRequest: jest.fn(),
    rejectRequest: jest.fn(),
  }
});

const {
  listRequests,
  approveRequest,
  updateRequestParameters,
  inquireRequest,
  rejectRequest,
} = require('../../lib/connect/api/assetRequests/actions');

jest.mock('../../lib/connect/api/assetRequests/create', () => {
  return {
    createAssetPurchaseRequest: jest.fn(),
    createAssetChangeRequest: jest.fn(),
    createAssetSuspendRequest: jest.fn(),
    createAssetResumeRequest: jest.fn(),
    createAssetCancelRequest: jest.fn(),
    createAssetRequestFromOrder: jest.fn(),
  }
});

const {
  createAssetPurchaseRequest,
  createAssetChangeRequest,
  createAssetSuspendRequest,
  createAssetResumeRequest,
  createAssetCancelRequest,
  createAssetRequestFromOrder,
} = require('../../lib/connect/api/assetRequests/create');


const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it.each([
    ['approve_request', approveRequest],
    ['create_asset_cancel_request', createAssetCancelRequest],
    ['create_asset_change_request', createAssetChangeRequest],
    ['create_asset_purchase_request', createAssetPurchaseRequest],
    ['create_asset_resume_request', createAssetResumeRequest],
    ['create_asset_suspend_request', createAssetSuspendRequest],
    ['fill_fulfillment_params', updateRequestParameters],
    ['fill_fulfillment_params_lis', updateRequestParameters],
    ['inquire_request', inquireRequest],
    ['inquire_request_lis', inquireRequest],
    ['reject_request', rejectRequest],
    ['create_asset_requests_from_order', createAssetRequestFromOrder],
  ])('%s', async (testcase, fn) => {

    bundle = {
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