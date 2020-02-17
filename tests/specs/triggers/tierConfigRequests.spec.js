/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/tierConfigRequests/actions', () => {
  return {
    listRequests: jest.fn(),
  }
});

const {
  listRequests,
} = require('../../../lib/connect/api/tierConfigRequests/actions');


const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('new tier config requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([]);
    await appTester(App.triggers.new_tier_config_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, '-created');    
  });
  it('new or updated requests', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT
      },
      inputData: {
        test: 'test'
      }
    };
    listRequests.mockReturnValue([{id: 'TCR-000', events: { updated: { at: 'test' } }}]);
    const response = await appTester(App.triggers.new_updated_tier_config_requests.operation.perform, bundle);
    expect(listRequests).toHaveBeenCalledWith(expect.anything(), bundle.inputData, null);    
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toHaveProperty('id');
    expect(response[0]).toHaveProperty('request_id');
    expect(response[0].request_id).toEqual('TCR-000');
    expect(response[0].id).toEqual('8eadfe52313d314f1bc59f03b8dfce1722355f1b');
  });
});