/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetRequestFromOrder } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/requests_from_order');
const inputFields = require('../../fields/input/new_asset_requests_from_order');

module.exports = {
  key: 'create_asset_requests_from_order',
  noun: 'Asset Request',
  display: {
    label: 'Create Asset Request from external system order',
    description: 'Enables providers to create or modify one or multiple assets with a single order payload from an external system. '
        + 'Automatically detects products set in the payload. No limits for the maximum number, but at one item of one product needs to be present.'
        + 'For a given product, automatically detects if a new asset needs to be created or existing needs to be adjusted by searching via external asset id.',
    important: true,
  },
  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createAssetRequestFromOrder(client, bundle.inputData);
    },
    sample,
  },
};
