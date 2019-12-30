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
  key: 'search_tier_config_requests',
  noun: 'Request',
  display: {
    label: 'Search a Tier Config Request',
    description: 'Search for Tier Config Requests.',
  },

  operation: {
    inputFields,
    perform: (z, bundle) => listRequests(z, bundle, '-created'),
    sample,
    outputFields,
  },
};
