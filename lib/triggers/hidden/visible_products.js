/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


const { getConnectClient } = require('../../connect/http');
const { listVisibleProducts } = require('../../connect/api/misc');


module.exports = {
  key: 'visible_products',
  noun: 'Product',

  display: {
    label: 'Get visible products',
    description: 'Triggers when new visible products are available.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listVisibleProducts(client);
    },

    sample: {
      id: 'PRD-000-000-000',
      name: 'Product',
    },

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ],
  },
};
