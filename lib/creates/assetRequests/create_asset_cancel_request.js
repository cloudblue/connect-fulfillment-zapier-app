/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetCancelRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { SUSPEND_RESUME_CANCEL_FIELDS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_cancel_request',
  noun: 'Asset Cancel Request',
  display: {
    label: 'Create Asset Cancel Request',
    description: 'Distributors can create cancel requests using this action, in order to cancel an asset.',
  },
  operation: {
    inputFields: SUSPEND_RESUME_CANCEL_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetCancelRequest(client, bundle.inputData);
    },
    sample,
  },
};
