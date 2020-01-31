/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetRequestFromOrder } = require('../connect/api/requests');
const sample = require('../samples/requests_from_order');
const inputFields = require('../fields/input/new_asset_requests_from_order');

module.exports = {
  key: 'create_asset_requests_from_order',
  noun: 'Asset Request',
  display: {
    label: 'Create Asset Request from external system order',
    description: 'Providers can create asset requests of any kind dynamically, '
        + 'is not needed that they know the type of request to create since given '
        + 'an external system primary key this action will create as much requests '
        + 'as needed for assets having mapped external id. This Zap assumes that only '
        + 'a single asset for a given product exists based on the external id provided as inout of the action.',
    important: true,
  },
  operation: {
    inputFields,
    perform: createAssetRequestFromOrder,
    sample,
  },
};
