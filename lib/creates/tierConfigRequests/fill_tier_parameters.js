/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { updateRequestParameters } = require('../../connect/api/tierConfigRequests/actions');
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
    inputFields: [
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to set to inquire, this one can come from previous '
        + 'steps of the Zap or from a Search.',
      },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Error Text. The parameter ID is the one '
        + 'that will be set as require changes, the error text is a text to be displayed to '
        + 'the technical contact on the activation form.',
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
