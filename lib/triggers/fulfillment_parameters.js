/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Inventory } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');

const getAssetParametersForFulfillmentByProduct = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const inventory = new Inventory(client);
  const parameters = await inventory.getAssetParametersForFulfillmentByProduct(
    bundle.inputData.id,
  );
  return Promise.resolve(parameters);
};

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
    perform: getAssetParametersForFulfillmentByProduct,
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
