/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { ignoreRequest } = require('../../connect/api/tierAccountRequests/actions');
const sample = require('../../samples/tier_account_request');


module.exports = {
  key: 'ignore_tier_account_request',
  noun: 'Tier Account Request',
  display: {
    label: 'Ignore Tier Account Request',
    description: 'Vendors can use this action to ignore a concrete request that is in status pending.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to accept, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'reason',
        label: 'Reason',
        required: true,
        helpText: 'Provide a reason why the request has been ignored.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return ignoreRequest(client, bundle.inputData);
    },
    sample,
  },
};
