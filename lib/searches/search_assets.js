/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
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
