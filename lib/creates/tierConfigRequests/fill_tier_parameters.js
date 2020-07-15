/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { updateRequestParameters } = require('../../connect/api/tierConfigRequests/actions');
const { getFillTCRParametersFields } = require('../../fields/input/fill_tcr_parameters');
const sample = require('../../samples/tier_config_request');


module.exports = {
  key: 'fill_tier_params',
  noun: 'Tier Config Parameter',
  display: {
    label: 'Fill Tier Config Request Parameters',
    description: 'Vendors can use this action to populate values for '
      + 'Fulfillment parameters on Tier Config Requests knowing the list '
      + 'of parameters they want to populate, the values can come from previous steps.',
  },
  operation: {
    inputFields: [getFillTCRParametersFields],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return updateRequestParameters(client, bundle.inputData);
    },
    sample,
  },
};
