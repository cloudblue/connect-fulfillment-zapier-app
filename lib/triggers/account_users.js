/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');

const listUsers = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const users = await client.accounts.users(bundle.authData.account_id).search({
    limit: 30,
    offset: 30 * bundle.meta.page,
  });
  if (bundle.meta.page === 0) {
    users.unshift({
      id: 'UNASSIGNED',
      name: '-- Unassigned --',
    });
  }
  return Promise.resolve(users);
};

module.exports = {
  key: 'account_users',
  noun: 'User',

  display: {
    label: 'Get users belonging to the connected account.',
    description: 'Triggers when new products are available.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    canPaginate: true,
    perform: listUsers,

    sample: {
      id: 'UR-000-000-000',
      name: 'Example user',
    },

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ],
  },
};
