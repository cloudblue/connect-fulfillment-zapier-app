/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */
const { getConnectClient } = require('../../connect/http');
const { updateRequestParameters } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/request');


module.exports = {
  key: 'fill_fulfillment_params',
  noun: 'Fulfillment Parameter',
  display: {
    label: 'Fill Asset Request Parameters',
    description: 'Vendors can use this action to populate values for '
    + 'Fulfillment parameters on Asset requests that are in pending status, '
    + 'the values can come from previous steps.',
  },
  operation: {
    inputFields: [
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Provide the list of parameters to set value, first field is to specify the '
          + 'parameter id as seen on CloudBlue Connect portals, the second field is to provide '
          + 'it\'s value. Please note that both can be populated from previous steps in the Zap.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return updateRequestParameters(client, bundle.inputData);
    },
    sample,
  },
};
