/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/caseRequests/actions', () => {
  return {
    searchCases: jest.fn(),
    searchCaseComments: jest.fn(),
  }
});

const {
  searchCases,
  searchCaseComments,
} = require('../../../lib/connect/api/caseRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new case', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchCases.mockReturnValue([]);
    await appTester(App.triggers.new_case.operation.perform, bundle);
    expect(searchCases).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
  it('new case comment', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchCaseComments.mockReturnValue([]);
    await appTester(App.triggers.new_case_comment.operation.perform, bundle);
    expect(searchCaseComments).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
});
