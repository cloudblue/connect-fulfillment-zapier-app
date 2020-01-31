/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const sample = require('../samples/request');
const inputFields = require('../fields/input/search_requests');
const outputFields = require('../fields/output/request');

const { listRequests } = require('../connect/api/requests');

module.exports = {
  key: 'new_requests',
  noun: 'Request',

  display: {
    label: 'New Asset Request',
    description: 'Triggers when a new fulfillment request appears on the fulfillment queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields: inputFields.concat([
      {
        key: 'records_per_page',
        label: 'Amount of records per batch query',
        helpText: 'On each poll to CloudBlue Connect, Zapier will obtain as much requests as provided here, '
          + 'this option is specially useful in the case you are creating a Zap for an account eith a lot of '
          + 'requests to limit the amount of samples obtained.',
        type: 'integer',
        default: '100',
        required: false,
      },
      {
        key: 'process_in_batch',
        label: 'Process requests in batch',
        helpText: 'In case that amount of requests on CloudBlue Connect Fulfillment queue is bigger than previous value, '
          + 'more records can be obtained in matches or limit to obtain the first batch.',
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
