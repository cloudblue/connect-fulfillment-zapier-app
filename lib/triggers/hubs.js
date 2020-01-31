/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/list_hubs');

const listHubs = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const hubs = await client.hubs.search();
  return Promise.resolve(hubs);
};

module.exports = {
  key: 'hubs',
  noun: 'Hubs',

  display: {
    label: 'Get a list of hubs',
    description: 'Triggers when new hubs are available.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    perform: listHubs,

    sample,

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ],
  },
};
