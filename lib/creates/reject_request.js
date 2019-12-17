/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/reject_request');

const rejectRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.failRequest(
    bundle.inputData.request_id,
    bundle.inputData.reason,
  );
  return Promise.resolve(response);
};

module.exports = {
  key: 'reject_request',
  noun: 'Reject a Request',
  display: {
    label: 'Reject a Request',
    description: 'Change the status of a Request to "failed"',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'reason', label: 'Reason', required: true },
    ],
    perform: rejectRequest,
    sample,
  },
};
