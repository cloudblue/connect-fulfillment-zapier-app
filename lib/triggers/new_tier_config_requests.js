/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const sample = require('../samples/tier_config_request');
const inputFields = require('../fields/input/search_tier_config_requests');
const outputFields = require('../fields/output/tier_config_request');

const { listRequests } = require('../connect/api/tierConfigRequests');

module.exports = {
  key: 'new_tier_config_requests',
  noun: 'Tier Config Request',

  display: {
    label: 'New Tier Config Request',
    description: 'Using polling to CloudBlue Connect, the Zap will be executed when a new Tier Config request appears on the fulfillment queue.',
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
    perform: (z, bundle) => listRequests(z, bundle, '-created'),
    sample,
    outputFields,
  },
};
