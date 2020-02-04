/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../lib/connect/api/misc', () => {
  return {
    createMessage: jest.fn()  
  }
});

const {
  createMessage,
} = require('../../lib/connect/api/misc');


const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('others', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('create_message', async () => {

    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        id: 'PR-000'
      }
    };
    createMessage.mockReturnValue({});
    await appTester(App.creates.create_message.operation.perform, bundle);
    expect(createMessage).toHaveBeenCalledWith(expect.anything(), bundle.inputData);    
  });
});