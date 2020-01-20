/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

// const { Query } = require('rql/query');
const _ = require('lodash');
const { getConnectClient } = require('../connect/http');

const listProducts = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  // const query = new Query().eq('latest', true).eq('status', 'published');
  const products = await client.products.list();
  return Promise.resolve(_.uniqBy(products, (o) => o.id));
};

module.exports = {
  key: 'latest_published_products',
  noun: 'Product',

  display: {
    label: 'Get published products (latest version)',
    description: 'Triggers when new products are available.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    perform: listProducts,

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
