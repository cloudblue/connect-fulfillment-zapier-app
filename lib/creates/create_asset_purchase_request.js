/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { createAssetPurchaseRequest } = require('../connect/api/assetRequests/create');
const sample = require('../samples/request');
const { PURCHASE_FIELDS } = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_purchase_request',
  noun: 'Asset Purchase Request',
  display: {
    label: 'Create Asset Purchase Request',
    description: 'Providers can create purchase requests using this action, '
      + 'action has line items support to add multiple items or set multiple parameters of order type together with the request.',
  },
  operation: {
    inputFields: PURCHASE_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetPurchaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
