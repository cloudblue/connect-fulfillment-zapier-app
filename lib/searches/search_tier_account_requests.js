/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { listRequests } = require('../connect/api/tierAccountRequests/actions');

const sample = require('../samples/request');
const inputFields = require('../fields/input/search_tier_account_requests');
const outputFields = require('../fields/output/tier_account_request');


module.exports = {
  key: 'search_tier_account_requests',
  noun: 'Tier Account Request',
  display: {
    label: 'Search a Tier Account Request',
    description: 'Search for Tier Account Requests.',
  },

  operation: {
    inputFields,
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRequests(client, bundle.inputData, '-events.created.at');
    },
    sample,
    outputFields,
  },
};
