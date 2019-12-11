/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../utils');
const sample = require('../samples/reject_request');

const rejectRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.requests.rejectRequest(
    bundle.inputData.requestId,
    bundle.inputData.reason,
  );
  return Promise.resolve(response);
};

module.exports = {
  key: 'reject_request',
  noun: 'Reject a Request',
  display: {
    label: 'Reject a Request',
    description: 'Change the status of a Request to "rejected"',
  },
  operation: {
    inputFields: [
      { key: 'requestId', label: 'Request ID', required: true },
      { key: 'reason', label: 'Reason', required: true },
    ],
    perform: rejectRequest,
    sample,
  },
};
