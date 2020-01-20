/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const sample = require('../samples/product_event');

const { getConnectClient } = require('../connect/http');

const subscribe = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  client.addBeforeRequestHook((url, options) => ({
    url,
    options: _.merge(options,
      {
        headers: {
          'X-Request-Origin': 'https://zapier.com',
          'X-Company-ID': bundle.authData.account_id,
        },
      }),
  }));

  const body = {
    label: `[Zap-${bundle.meta.zap.id}] ${bundle.inputData.label}`,
    product_id: bundle.inputData.product_id,
    external_url: bundle.targetUrl,
    jwt_secret: `JWT-${uuidv4()}`,
    active: true,
    description: bundle.inputData.description,
    http_method: 'POST',
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return client.webhooks.create(body);
};

const unsubscribe = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  client.addBeforeRequestHook((url, options) => ({
    url,
    options: _.merge(options,
      {
        headers: {
          'X-Request-Origin': 'https://zapier.com',
          'X-Company-ID': bundle.authData.account_id,
        },
      }),
  }));
  await client.webhooks.delete(bundle.subscribeData.id);
  return Promise.resolve({});
};


const getEvent = (z, bundle) => {
  const event = {
    webhook_id: bundle.cleanedRequest.webhook_id,
    webhook_name: bundle.cleanedRequest.webhook_name,
    object_class: bundle.cleanedRequest.object_class,
    account_id: bundle.cleanedRequest.account_id,
    product_id: bundle.cleanedRequest.product_id,
    api_url: bundle.cleanedRequest.api_url,
    triggered_at: bundle.cleanedRequest.triggered_at,
    last_success_at: bundle.cleanedRequest.last_success_at,
    last_failure_at: bundle.cleanedRequest.last_failure_at,
    processing_timeout: bundle.cleanedRequest.processing_timeout,
    data: bundle.cleanedRequest.data,
  };
  return [event];
};

/* eslint-disable no-unused-vars */
const getFallbackEvent = (z, bundle) => Promise.resolve([{
  webhook_id: 'WH-000-000-000',
  webhook_name: 'test webhook',
  object_class: 'fulfillment_requests',
  account_id: 'VA-000-000',
  product_id: 'PRD-000-000-000',
  api_url: 'https://api.connect.cloudblue.com/public/v1',
  triggered_at: '2020-01-14T10:04:56+00:00',
  last_success_at: '2020-01-14T10:03:29+00:00',
  last_failure_at: null,
  processing_timeout: 600,
  data: {},
}]);


module.exports = {
  key: 'new_product_event',
  noun: 'Event',
  display: {
    label: 'New Product Fulfillment Event',
    description: 'Trigger when a new fulfillment event is fired for a product.',
  },

  operation: {
    inputFields: [
      {
        key: 'product_id',
        type: 'string',
        label: 'Product ID',
        helpText: 'Choose a product',
        dynamic: 'latest_published_products.id.name',
        required: true,
      },
      {
        key: 'label',
        type: 'string',
        label: 'Label',
        required: true,
      },
      {
        key: 'description',
        type: 'string',
        label: 'Description',
        helpText: 'Enter a descriptive text about this Zap.',
        required: true,
      },
    ],

    type: 'hook',

    performSubscribe: subscribe,
    performUnsubscribe: unsubscribe,

    perform: getEvent,
    performList: getFallbackEvent,
    sample,

    outputFields: [
      { key: 'webhook_id', label: 'Webhook ID' },
      { key: 'webhook_name', label: 'Label' },
      { key: 'object_class', label: 'Object class' },
      { key: 'account_id', label: 'Account ID' },
      { key: 'product_id', label: 'Product ID' },
      { key: 'api_url', label: 'API URL' },
      { key: 'triggered_at', label: 'Triggered at' },
      { key: 'last_success_at', label: 'Last success At' },
      { key: 'last_failure_at', label: 'Last failure At' },
      { key: 'processing_timeout', label: 'Processing timeout' },
    ],
  },
};
