/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');
const { getConnectClient } = require('../../connect/http');
const sample = require('../../samples/billing_request');
const inputFields = require('../../fields/input/search_billing_requests');
const outputFields = require('../../fields/output/billing_request');

const { listRequests } = require('../../connect/api/billingRequests/actions');


const swapId = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const results = await listRequests(client, bundle.inputData, null);
  _.forEach(results, (value) => {
    /* eslint-disable no-param-reassign */
    value.request_id = value.id;
    value.id = z.hash('sha1', value.id + value.events.updated.at);
  });
  return Promise.resolve(results);
};

module.exports = {
  key: 'new_updated_billing_requests',
  noun: 'Billing Request',

  display: {
    label: 'New or Updated Billing Request',
    description: 'Triggers when a billing request is created or gets updated on the billing queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields,
    perform: swapId,
    sample,
    outputFields,
  },
};
