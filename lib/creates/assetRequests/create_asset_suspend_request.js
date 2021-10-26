/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetSuspendRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { SUSPEND_RESUME_CANCEL_FIELDS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_suspend_request',
  noun: 'Asset Suspend Request',
  display: {
    label: 'Create Asset Suspend Request',
    description: 'Allows the creation of a single request of type "suspend" on a existing asset in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: SUSPEND_RESUME_CANCEL_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetSuspendRequest(client, bundle.inputData);
    },
    sample,
  },
};
