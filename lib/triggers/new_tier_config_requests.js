/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { listRequests } = require('../connect/api/tierConfigRequests/actions');

const sample = require('../samples/tier_config_request');
const inputFields = require('../fields/input/search_tier_config_requests');
const outputFields = require('../fields/output/tier_config_request');


module.exports = {
  key: 'new_tier_config_requests',
  noun: 'Tier Configuration Request',

  display: {
    label: 'New Tier Configuration Request',
    description: 'Triggers when a new Tier Configuration Request appears on the fulfillment queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields: inputFields.concat([
      {
        key: 'records_per_page',
        label: 'Amount of records per batch query',
        type: 'integer',
        default: '100',
        required: false,
      },
      {
        key: 'process_in_batch',
        label: 'Process requests in batch',
        type: 'boolean',
        default: 'yes',
        required: false,
      },
    ]),
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRequests(client, bundle.inputData, '-created');
    },
    sample,
    outputFields,
  },
};
