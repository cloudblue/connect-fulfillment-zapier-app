/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const inputFields = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_request',
  noun: 'Asset Request',
  display: {
    label: 'Create Asset Request',
    description: 'Providers can create requests of any type using this action, '
      + 'action has line items support to add multiple items or set multiple parameters of order type together with the request.',
    important: true,
  },
  operation: {
    inputFields,
    perform: createAssetRequest,
    sample,
  },
};
