/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { createWebhook, deleteWebhook } = require('../connect/api/webhooks');
const sample = require('../samples/product_event');


const subscribe = async (z, bundle) => {
  const data = {
    zap_id: bundle.meta.zap.id,
    label: bundle.inputData.label,
    description: bundle.inputData.description,
    product_id: bundle.inputData.product_id,
    target_url: bundle.targetUrl,
  };
  const client = getConnectClient(z, bundle);
  return createWebhook(client, data);
};

const unsubscribe = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  return deleteWebhook(client, bundle.subscribeData);
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
    label: 'New Per Product Fulfillment Request',
    description: 'Triggers when a request is created or updated for a particular product using a CloudBlue Connect Webhook.',
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'product_id',
        type: 'string',
        label: 'Product ID',
        helpText: 'Choose a product',
        dynamic: 'visible_products.id.name',
        required: true,
      },
      {
        key: 'label',
        type: 'string',
        label: 'Name for newly created Connect Webhook',
        helpText: 'We will create a Webhook in Connect exclusive for this Zap, you will be '
          + 'able to identify it on Connect interface by the name provided here.',
        required: true,
      },
      {
        key: 'description',
        type: 'string',
        label: 'Description',
        helpText: 'Enter a descriptive text about this Zap thst you will be able to identify on Connect interface.',
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
      { key: 'processing_timeout', label: 'Processing timeout', type: 'integer' },
    ],
  },
};
