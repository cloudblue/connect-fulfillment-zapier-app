/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { rejectRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/reject_request');


module.exports = {
  key: 'reject_request',
  noun: 'Asset Request',
  display: {
    label: 'Reject Asset Request',
    description: 'Providers and Vendors can use this action to reject a concrete request.',
  },
  operation: {
    inputFields: [
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'reason',
        label: 'Reason',
        required: true,
        helpText: 'Provide a reason why the request has been failed, please note that Providers and their customers can see it and maybe propagated to commerce system.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return rejectRequest(client, bundle.inputData);
    },
    sample,
  },
};
