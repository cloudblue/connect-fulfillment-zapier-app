/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');

const { getAssetParametersForFulfillmentByProduct } = require('../../connect/api/misc');

module.exports = {
  key: 'fulfillment_parameters',
  noun: 'Fulfillemnt parameters',

  display: {
    label: 'Get fulfillment parameters.',
    description: 'Get the fulfillment parameters (scope=asset, phase=fulfillment)',
    hidden: true,
  },

  operation: {
    inputFields: [
      { key: 'id', label: 'Product ID', required: true },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return getAssetParametersForFulfillmentByProduct(client, bundle.inputData);
    },
    sample: {
      name: 'admin_email',
      title: 'Admin account email',
    },

    outputFields: [
      { key: 'name', label: 'ID' },
      { key: 'title', label: 'Title' },
    ],
  },
};
