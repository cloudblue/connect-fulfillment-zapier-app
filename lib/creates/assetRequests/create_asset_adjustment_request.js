/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetAdjustmentRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { PURCHASE_FIELDS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_adjustment_request',
  noun: 'Asset Adjustment Request',
  display: {
    label: 'Create Asset Adjustment Request',
    description: 'Distributors can create adjustment requests using this action, '
      + 'action has line items support to add multiple items or set multiple parameters of ordering type together with the request.',
  },
  operation: {
    inputFields: PURCHASE_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetAdjustmentRequest(client, bundle.inputData);
    },
    sample,
  },
};
