/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createUpdateTierConfigRequest } = require('../../connect/api/tierConfigRequests/create');
const sample = require('../../samples/request');


module.exports = {
  key: 'create_update_tier_config_request',
  noun: 'Tier Config Request',
  display: {
    label: 'Create Update Tier Config Request',
    description: 'Distributors can create Update Tier Config Requests for existing '
      + 'Tier Configs, the Tier Config ID is required and can be obtained using '
      + 'the search, the list of parameters to update must be known and could be all of type order.',
  },
  operation: {
    inputFields: [
      { key: 'config_id', label: 'Tier Configuration ID', required: true },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Value',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createUpdateTierConfigRequest(client, bundle.inputData);
    },
    sample,
  },
};
