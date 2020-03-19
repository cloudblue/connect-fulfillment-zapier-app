/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createTierAccountRequest } = require('../../connect/api/tierAccountRequests/create');
const sample = require('../../samples/tier_account_request');
const { REQUEST_FIELDS } = require('../../fields/input/new_tier_account_request');

module.exports = {
  key: 'create_tier_account_request',
  noun: 'Tier Account Request',
  display: {
    label: 'Create Tier Account Request',
    description: 'Providers can create a new Tier Account Request to communicate data changes to vendors.',
  },
  operation: {
    inputFields: REQUEST_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createTierAccountRequest(client, bundle.inputData);
    },
    sample,
  },
};
