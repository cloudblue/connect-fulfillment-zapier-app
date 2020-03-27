/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');
const { getConnectClient } = require('../../connect/http');
const sample = require('../../samples/billing_request');
const inputFields = require('../../fields/input/search_recurring_assets');
const outputFields = require('../../fields/output/recurring_asset');

const { listRecurringAssets } = require('../../connect/api/recurringAssets');


const swapId = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const results = await listRecurringAssets(client, bundle.inputData, null);
  _.forEach(results, (value) => {
    /* eslint-disable no-param-reassign */
    value.request_id = value.id;
    value.id = z.hash('sha1', value.id + value.events.updated.at);
  });
  return Promise.resolve(results);
};

module.exports = {
  key: 'new_updated_recurring_assets',
  noun: 'Recurring Asset',

  display: {
    label: 'New Or Updated Recurring Asset',
    description: 'Triggers when a recurring asset is created or gets updated on the subscriptions queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields,
    perform: swapId,
    sample,
    outputFields,
  },
};
