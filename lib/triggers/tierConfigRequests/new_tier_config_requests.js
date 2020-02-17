/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { listRequests } = require('../../connect/api/tierConfigRequests/actions');

const sample = require('../../samples/tier_config_request');
const inputFields = require('../../fields/input/search_tier_config_requests');
const outputFields = require('../../fields/output/tier_config_request');


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
        helpText: 'On each poll to CloudBlue Connect, Zapier will limit the results to the limit specified here, '
          + 'this option is especially useful in the case you are creating a Zap for an account either with a lot '
          + 'of tier configuration requests or to limit the amount of samples obtained while designing the zap.',
        type: 'integer',
        default: '100',
        required: false,
      },
      {
        key: 'process_in_batch',
        label: 'Process requests in batch',
        helpText: 'This option when set to yes causes that zapier obtains all tier configuration requests in your queue '
          + 'matching the different filters you specify in batches, each batch will be as big as specified in the previous option.',
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
