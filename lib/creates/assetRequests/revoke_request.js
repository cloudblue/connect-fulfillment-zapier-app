/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { revokeRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'revoke_request',
  noun: 'Revoke Request',
  display: {
    label: 'Revoke Asset Request',
    description: 'Distributors can use this action to revoke a concrete request that is in status scheduled.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'reason',
        label: 'Reason',
        required: true,
        helpText: 'Reason for request being revoked.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return revokeRequest(client, bundle.inputData);
    },
    sample,
  },
};
