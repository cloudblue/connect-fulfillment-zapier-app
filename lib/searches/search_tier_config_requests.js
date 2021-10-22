/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { listRequests } = require('../connect/api/tierConfigRequests/actions');

const sample = require('../samples/tier_config_request');
const inputFields = require('../fields/input/search_tier_config_requests');
const outputFields = require('../fields/output/tier_config_request');


module.exports = {
  key: 'search_tier_config_requests',
  noun: 'Tier Configuration Request',
  display: {
    label: 'Search a Tier Configuration Request',
    description: 'Search for Tier Configuration Requests.',
  },

  operation: {
    inputFields,
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRequests(client, bundle.inputData, '-created');
    },
    sample,
    outputFields,
  },
};
