/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetChangeRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { CHANGE_FIELDS_LIS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_change_request_lis',
  noun: 'Asset Change Request',
  display: {
    label: 'Create Asset Change Request (With Line Items Support)',
    description: 'Allows the creation of a single request of type "change" on a existing asset in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: CHANGE_FIELDS_LIS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetChangeRequest(client, bundle.inputData);
    },
    sample,
  },
};
