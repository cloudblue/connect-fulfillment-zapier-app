/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/misc', () => {
  return {
    searchConversations: jest.fn(),
  }
});

const {
  searchConversations,
} = require('../../../lib/connect/api/misc');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('searches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('conversations', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    searchConversations.mockReturnValue([]);
    await appTester(App.searches.search_conversations.operation.perform, bundle);
    expect(searchConversations).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
});
