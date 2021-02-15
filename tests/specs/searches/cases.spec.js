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

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('cases', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        case_id: 'CA-000'
      }
    };
    searchCases.mockReturnValue([]);
    await appTester(App.searches.search_cases.operation.perform, bundle);
    expect(searchCases).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
  it('cases_comments', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        case_id: 'CA-000'
      }
    };
    searchCaseComments.mockReturnValue([]);
    await appTester(App.searches.search_comments.operation.perform, bundle);
    expect(searchCaseComments).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
});
