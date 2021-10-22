/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */
const { getConnectClient } = require('../../connect/http');
const { failRequest } = require('../../connect/api/tierConfigRequests/actions');
const sample = require('../../samples/tier_config_request');


module.exports = {
  key: 'fail_tier_config_request',
  noun: 'Tier Configuration',
  display: {
    label: 'Reject Tier Configuration Request',
    description: 'Vendors can use this action to Reject Tier Configuration Requests.',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'reason', label: 'Reason', required: true },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return failRequest(client, bundle.inputData);
    },
    sample,
  },
};
