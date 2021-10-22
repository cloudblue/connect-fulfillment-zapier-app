/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

jest.mock('../../../lib/connect/api/misc', () => {
  return {
    listUsers: jest.fn(),
    getActivationTemplates: jest.fn(),
    getAssetParametersForFulfillmentByProduct: jest.fn(),
    listHubs: jest.fn(),
    listVisibleProducts: jest.fn(),
    getMessagesByObjectId: jest.fn(),
    searchConversations: jest.fn(),

  }
});

const {
  listUsers,
  getActivationTemplates,
  getAssetParametersForFulfillmentByProduct,
  listHubs,
  listVisibleProducts,
  getMessagesByObjectId,
  searchConversations,
} = require('../../../lib/connect/api/misc');


jest.mock('../../../lib/connect/api/webhooks', () => {
  return {
    createWebhook: jest.fn(),
    deleteWebhook: jest.fn(),
  }
});

const {
  createWebhook,
  deleteWebhook,
} = require('../../../lib/connect/api/webhooks');

const App = require('../../../index');
const appTester = zapier.createAppTester(App);

describe('triggers.others', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('listUsers', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
        account_id: 'VA-000'
      },
      meta: {
        page: 0
      }
    };
    listUsers.mockReturnValue([]);
    await appTester(App.triggers.account_users.operation.perform, bundle);
    expect(listUsers).toHaveBeenCalledWith(expect.anything(), { account_id: 'VA-000', page: 0 });    
  });
  it('getActivationTemplates', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
    };
    getActivationTemplates.mockReturnValue([]);
    await appTester(App.triggers.activation_templates.operation.perform, bundle);
    expect(getActivationTemplates).toHaveBeenCalled();    
  });
  it('getAssetParametersForFulfillmentByProduct', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      inputData: {
        id: 'PRD-000'
      }
    };
    getAssetParametersForFulfillmentByProduct.mockReturnValue([]);
    await appTester(App.triggers.fulfillment_parameters.operation.perform, bundle);
    expect(getAssetParametersForFulfillmentByProduct).toHaveBeenCalledWith(expect.anything(), {id: 'PRD-000'});    
  });
  it('listHubs', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
    };
    listHubs.mockReturnValue([]);
    await appTester(App.triggers.hubs.operation.perform, bundle);
    expect(listHubs).toHaveBeenCalled();    
  });
  it('listVisibleProducts', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
    };
    listVisibleProducts.mockReturnValue([]);
    await appTester(App.triggers.visible_products.operation.perform, bundle);
    expect(listVisibleProducts).toHaveBeenCalled();    
  });
  it('getMessagesByObjectId', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      inputData: {
        id: 'PR-000'
      }
    };
    getMessagesByObjectId.mockReturnValue([]);
    await appTester(App.triggers.get_messages.operation.perform, bundle);
    expect(getMessagesByObjectId).toHaveBeenCalledWith(expect.anything(), {id: 'PR-000'});    
  });

  it('searchConversations', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      inputData: {
        id: 'CO-000'
      }
    };
    searchConversations.mockReturnValue([]);
    await appTester(App.triggers.new_conversations.operation.perform, bundle);
    expect(searchConversations).toHaveBeenCalledWith(expect.anything(), {id: 'CO-000'}, '-created');    
  });


  it('new_product_event subscribe', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      inputData: {
        label: 'label',
        description: 'description',
        product_id: 'PRD-000',
        object_class: 'listing_request',
      },
      meta: {
        zap: {
          id: 11111
        }
      },
      targetUrl: 'http://example.com'
    };
    createWebhook.mockReturnValue({});
    await appTester(App.triggers.new_product_event.operation.performSubscribe, bundle);
    expect(createWebhook).toHaveBeenCalledWith(expect.anything(), {
      zap_id: 11111,
      label: 'label',
      description: 'description',
      product_id: 'PRD-000',
      object_class: 'listing_request',
      target_url: 'http://example.com'
    });    
  });
  it('new_product_event unsubscribe', async () => {
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      subscribeData: {
        id: 'WH-000',
      },
    };
    deleteWebhook.mockReturnValue({});
    await appTester(App.triggers.new_product_event.operation.performUnsubscribe, bundle);
    expect(deleteWebhook).toHaveBeenCalledWith(expect.anything(), {id: 'WH-000'});    
  });
  it('new_product_event perform', async () => {
    const data = {
      webhook_id: 'WH-000-000-000',
      webhook_name: 'test webhook',
      object_class: 'fulfillment_request',
      account_id: 'VA-000-000',
      product_id: 'PRD-000-000-000',
      api_url: 'https://api.connect.cloudblue.com/public/v1',
      triggered_at: '2020-01-14T10:04:56+00:00',
      last_success_at: '2020-01-14T10:03:29+00:00',
      last_failure_at: null,
      processing_timeout: 600,
      data: {},
    }
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
      cleanedRequest: data,
    };
    const response = await appTester(App.triggers.new_product_event.operation.perform, bundle);
    expect(response).toBeInstanceOf(Array);
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(data);
  });
  it('new_product_event performList', async () => {
    const data = {
      webhook_id: 'WH-000-000-000',
      webhook_name: 'test webhook',
      object_class: 'fulfillment_request',
      account_id: 'VA-000-000',
      product_id: 'PRD-000-000-000',
      api_url: 'https://api.connect.cloudblue.com/public/v1',
      triggered_at: '2020-01-14T10:04:56+00:00',
      last_success_at: '2020-01-14T10:03:29+00:00',
      last_failure_at: null,
      processing_timeout: 600,
      data: {},
    }
    const bundle = {
      authData: {
        api_key: process.env.CONNECT_API_KEY,
        endpoint: process.env.CONNECT_ENDPOINT,
      },
    };
    const response = await appTester(App.triggers.new_product_event.operation.performList, bundle);
    expect(response).toBeInstanceOf(Array);
    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(data);
  });
});