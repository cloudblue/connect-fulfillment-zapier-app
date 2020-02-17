/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/tierConfig');
const inputFields = require('../fields/input/search_tierConfigs');
const outputFields = require('../fields/output/tierConfig');

const { searchTierConfigs } = require('../connect/api/misc');
const { getConnectClient } = require('../connect/http');


module.exports = {
  key: 'search_tier_configs',
  noun: 'Tier Configuration',
  display: {
    label: 'Search a Tier Configuration',
    description: 'Search for Tier Configurations.',
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchTierConfigs(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
