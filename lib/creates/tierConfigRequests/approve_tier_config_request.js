/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { approveRequest } = require('../../connect/api/tierConfigRequests/actions');
const sample = require('../../samples/tier_config_request');


module.exports = {
  key: 'approve_tier_config_request',
  noun: 'Tier Configuration Request',
  display: {
    label: 'Approve Tier Configuration Request',
    description: 'Vendors can use this action to approve pending Tier Configuration Requests.',
  },
  operation: {
    inputFields: [
      { key: 'id', label: 'Request ID', required: true },
      { key: 'template_id', label: 'Template ID', required: true },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return approveRequest(client, bundle.inputData);
    },
    sample,
  },
};
