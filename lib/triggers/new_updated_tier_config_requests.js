/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const sample = require('../samples/tier_config_request');
const inputFields = require('../fields/input/search_tier_config_requests');
const outputFields = require('../fields/output/tier_config_request');

const { listRequests } = require('../connect/api/tierConfigRequests');

const swapId = async (z, bundle) => {
  const results = await listRequests(z, bundle, null);
  _.forEach(results, (value) => {
    /* eslint-disable no-param-reassign */
    value.request_id = value.id;
    value.id = z.hash('sha1', value.id + value.updated);
  });
  return Promise.resolve(results);
};

module.exports = {
  key: 'new_updated_tier_config_requests',
  noun: 'Request',

  display: {
    label: 'New or updated Tier Config Request',
    description: 'Triggers when a Tier Config Request is created or updated.',
  },

  operation: {
    inputFields,
    perform: swapId,
    sample,
    outputFields,
  },
};
