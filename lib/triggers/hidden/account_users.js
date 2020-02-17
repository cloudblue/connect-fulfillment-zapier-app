/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');

const { listUsers } = require('../../connect/api/misc');

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
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listUsers(client, { account_id: bundle.authData.account_id, page: bundle.meta.page });
    },
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
