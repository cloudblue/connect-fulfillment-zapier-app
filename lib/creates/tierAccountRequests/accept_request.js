/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { acceptRequest } = require('../../connect/api/tierAccountRequests/actions');
const sample = require('../../samples/tier_account_request');


module.exports = {
  key: 'accept_tier_account_request',
  noun: 'Tier Account Request',
  display: {
    label: 'Accept Tier Account Request',
    description: 'Vendors can use this action to accept a concrete request that is in status pending.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to accept, this one can come from previous steps of the Zap or from a Search.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return acceptRequest(client, bundle.inputData);
    },
    sample,
  },
};
