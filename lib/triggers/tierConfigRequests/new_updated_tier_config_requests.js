/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const { getConnectClient } = require('../../connect/http');
const { listRequests } = require('../../connect/api/tierConfigRequests/actions');

const sample = require('../../samples/tier_config_request');
const inputFields = require('../../fields/input/search_tier_config_requests');
const outputFields = require('../../fields/output/tier_config_request');


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
  key: 'new_updated_tier_config_requests',
  noun: 'Tier Configuration Request',

  display: {
    label: 'New or Updated Tier Configuration Request',
    description: 'Triggers when a Tier Configuration Request '
      + 'is created or gets updated on the fulfillment queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields,
    perform: swapId,
    sample,
    outputFields,
  },
};
