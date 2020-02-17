/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createUpdateTierConfigRequest } = require('../../connect/api/tierConfigRequests/create');
const sample = require('../../samples/request');


module.exports = {
  key: 'create_update_tier_config_request_lis',
  noun: 'Tier Configuration Request',
  display: {
    label: 'Create Update Tier Config Request (with line items support)',
    description: 'Providers can create Update Tier Config Requests for existing Tier Configs, '
      + 'the Tier Config ID is required and can be obtained using the search, the list of parameters '
      + 'to update may come from previous step of the Zap due line item support, please note that '
      + 'only ordering type parameters can be updated.',
  },
  operation: {
    inputFields: [
      { key: 'config_id', label: 'Tier Configuration ID', required: true },
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
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createUpdateTierConfigRequest(client, bundle.inputData);
    },
    sample,
  },
};
