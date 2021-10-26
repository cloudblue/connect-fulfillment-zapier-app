/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { listRecurringAssets } = require('../connect/api/recurringAssets');

const sample = require('../samples/billing_request');
const inputFields = require('../fields/input/search_recurring_assets');
const outputFields = require('../fields/output/recurring_asset');


module.exports = {
  key: 'search_recurring_assets',
  noun: 'Recurring Asset',
  display: {
    label: 'Search a Recurring Asset',
    description: 'Search for Recurring Assets.',
  },

  operation: {
    inputFields,
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRecurringAssets(client, bundle.inputData, '-events.created.at');
    },
    sample,
    outputFields,
  },
};
