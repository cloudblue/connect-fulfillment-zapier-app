/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/asset');
const inputFields = require('../fields/input/search_assets');
const outputFields = require('../fields/output/asset');

const { searchAssets } = require('../connect/api/misc');
const { getConnectClient } = require('../connect/http');

module.exports = {
  key: 'search_assets',
  noun: 'Asset',
  display: {
    label: 'Search an Asset',
    description: 'Search for Assets.',
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchAssets(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
