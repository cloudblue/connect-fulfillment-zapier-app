/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { updateRequestParameters } = require('../../connect/api/tierConfigRequests/actions');
const sample = require('../../samples/tier_config_request');


module.exports = {
  key: 'fill_tier_params_lis',
  noun: 'Tier Parameter',
  display: {
    label: 'Fill Tier Config Request Parameters (With Line Items Support)',
    description: 'Vendors can use this action to populate values for Fulfillment '
      + 'parameters on Tier Config Requests, with the help of line items support is '
      + 'possible to populate them dynamically and populate the ones resulting from previous steps of the Zap.',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      {
        key: 'params',
        children: [
          {
            key: 'id',
            required: true,
            label: 'Parameter ID',
          },
          {
            key: 'value',
            required: true,
            label: 'Value',
          },
        ],
      },
      { key: 'notes', label: 'Notes' },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return updateRequestParameters(client, bundle.inputData);
    },
    sample,
  },
};
