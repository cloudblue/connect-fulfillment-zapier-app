/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const getConnectClient = require('../utils').getConnectClient;

const listProducts = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const products = await client.products.list();
  return Promise.resolve(products);
};

module.exports = {
  key: 'latest_published_products',
  noun: 'Latest_published_products',

  display: {
    label: 'Get published products (latest version)',
    description: 'Triggers when new products are available.',
    hidden: true
  },

  operation: {
    inputFields: [
    ],
    perform: listProducts,

    sample: {
      id: 'PRD-000-000-000',
      name: 'Product'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
