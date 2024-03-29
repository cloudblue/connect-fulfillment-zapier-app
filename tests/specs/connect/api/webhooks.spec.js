/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { ConnectClient } = jest.requireActual('@cloudblueconnect/connect-javascript-sdk');

const { createWebhook, deleteWebhook } = require('../../../../lib/connect/api/webhooks');

describe('webhooks', () => {
  let client;

  beforeAll(() => {
    client = new ConnectClient('https://localhost', '1234567890');
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('createWebhook', async () => {
    const mockedFn = client.webhooks.create = jest.fn();
    mockedFn.mockReturnValue([]);
    const data = {
      product_id: 'PRD-000',
      zap_id: 111111,
      label: 'label',
      object_class: 'tier_config_request',
      description: 'description',
      target_url: 'https://example.com'
    };
    await createWebhook(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      label: '[Zap-111111] label',
      product_id: 'PRD-000',
      external_url: 'https://example.com',
      jwt_secret: expect.anything(),
      object_class: 'tier_config_request',
      active: true,
      description: 'description',
      http_method: 'POST',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  it('createWebhook (blank description)', async () => {
    const mockedFn = client.webhooks.create = jest.fn();
    mockedFn.mockReturnValue([]);
    const data = {
      product_id: 'PRD-000',
      zap_id: 111111,
      label: 'label',
      description: ' ',
      object_class: 'tier_config_request',
      target_url: 'https://example.com'
    };
    await createWebhook(client, data);
    expect(mockedFn).toHaveBeenCalledWith({
      label: '[Zap-111111] label',
      product_id: 'PRD-000',
      external_url: 'https://example.com',
      jwt_secret: expect.anything(),
      object_class: 'tier_config_request',
      active: true,
      description: '[Zap-111111] label',
      http_method: 'POST',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  it('deleteWebhook', async () => {
    const mockedFn = client.webhooks.delete = jest.fn();
    mockedFn.mockReturnValue({});
    const data = {
      id: 'WH-000',
    };
    await deleteWebhook(client, data);
    expect(mockedFn).toHaveBeenCalledWith('WH-000');
  });
});

