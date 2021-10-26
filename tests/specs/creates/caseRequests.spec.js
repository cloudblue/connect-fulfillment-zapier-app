/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */
const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/caseRequests/create', () => {
  return {
    createCaseRequest: jest.fn(),
    updateCaseRequest: jest.fn(),
    createCommentByCaseId: jest.fn(),  
  }
});
const {
  createCaseRequest,
  updateCaseRequest,
  createCommentByCaseId,
} = require('../../../lib/connect/api/caseRequests/create');

jest.mock('../../../lib/connect/api/caseRequests/actions', () => {
  return {
    pendCaseRequest: jest.fn(),
    inquireCaseRequest: jest.fn(),
    resolveCaseRequest: jest.fn(),
    closeCaseRequest: jest.fn(),  
  }
});
const {
  pendCaseRequest,
  inquireCaseRequest,
  resolveCaseRequest,
  closeCaseRequest,
} = require('../../../lib/connect/api/caseRequests/actions');

const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('caseRequest_creates_actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['pend_case_request', pendCaseRequest],
    ['inquire_case_request', inquireCaseRequest],
    ['resolve_case_request', resolveCaseRequest],
    ['close_case_request', closeCaseRequest],
    ['create_case', createCaseRequest],
    ['update_case', updateCaseRequest],
    ['create_case_comment', createCommentByCaseId],
  ])('%s', async (testcase, fn) => {

    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        case_id: 'CA-000'
      }
    };
    fn.mockReturnValue({});
    await appTester(App.creates[testcase].operation.perform, bundle);
    expect(fn).toHaveBeenCalledWith(expect.anything(), bundle.inputData);
  });
});