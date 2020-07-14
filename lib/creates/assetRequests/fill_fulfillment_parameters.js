/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */
const { getConnectClient } = require('../../connect/http');
const { updateRequestParameters } = require('../../connect/api/assetRequests/actions');
const { getFillAssetRequestParametersFields } = require('../../fields/input/fill_asset_request_parameters');
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
    inputFields: [getFillAssetRequestParametersFields],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return updateRequestParameters(client, bundle.inputData);
    },
    sample,
  },
};
