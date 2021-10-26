/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { confirmRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'confirm_request',
  noun: 'Confirm Request',
  display: {
    label: 'Confirm Asset Request',
    description: 'Vendors can use this action to confirm a concrete request that is in status revoking.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return confirmRequest(client, bundle.inputData);
    },
    sample,
  },
};
