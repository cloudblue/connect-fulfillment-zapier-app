/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { getOrderingParameters } = require('../../connect/api/misc');
const { getProductIdFromItems, getLogger } = require('../../utils');
const sample = require('../../samples/product_params');

const logger = getLogger();

module.exports = {
  key: 'orderingParameters',
  noun: 'Ordering parameters',

  display: {
    label: 'Get a list of ordering parameters',
    description: 'Hidden trigger.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      const productId = getProductIdFromItems(bundle.inputDataRaw.items);
      if (productId) {
        logger.debug(`Populate parameter dropdown for product ${productId}`);
        return getOrderingParameters(client, productId);
      }
      return Promise.resolve([]);
    },

    sample,

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ],
  },
};
