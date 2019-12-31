/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const failRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  await ff.failTierConfigRequest(
    bundle.inputData.request_id,
    bundle.inputData.reason,
  );
  return Promise.resolve({});
};

module.exports = {
  key: 'fail_tier_config_request',
  noun: 'Request',
  display: {
    label: 'Reject a Tier Config Request',
    description: 'Change the status of a Tier Config Request to "failed"',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'reason', label: 'Reason', required: true },
    ],
    perform: failRequest,
    sample,
  },
};
