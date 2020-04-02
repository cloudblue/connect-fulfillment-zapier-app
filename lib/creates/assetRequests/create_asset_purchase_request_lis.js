/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetPurchaseRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { PURCHASE_FIELDS_LIS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_purchase_request_lis',
  noun: 'Asset Purchase Request',
  display: {
    label: 'Create Asset Purchase Request (With Line Items Support)',
    description: 'Providers can create purchase requests using this action, '
      + 'action has line items support to add multiple items or set multiple parameters of ordering type together with the request.',
  },
  operation: {
    inputFields: PURCHASE_FIELDS_LIS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetPurchaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
