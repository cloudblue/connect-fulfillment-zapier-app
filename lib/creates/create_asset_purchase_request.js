/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetPurchaseRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const { PURCHASE_FIELDS } = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_purchase_request',
  noun: 'Asset Purchase Request',
  display: {
    label: 'Create Asset Purchase Request',
    description: 'Providers can create purchase requests using this action, '
      + 'action has line items support to add multiple items or set multiple parameters of order type together with the request.',
    important: true,
  },
  operation: {
    inputFields: PURCHASE_FIELDS,
    perform: createAssetPurchaseRequest,
    sample,
  },
};
