/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/request');
const inputFields = require('../fields/input/search_requests');
const outputFields = require('../fields/output/request');

const { listRequests } = require('../connect/api/assetRequests/actions');
const { getConnectClient } = require('../connect/http');


module.exports = {
  key: 'search_requests',
  noun: 'Asset Request',
  display: {
    label: 'Search an Asset Request',
    description: 'Search for Asset Requests.',
    important: true,
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRequests(client, bundle.inputData, '-created');
    },
    sample,
    outputFields,
  },
};
