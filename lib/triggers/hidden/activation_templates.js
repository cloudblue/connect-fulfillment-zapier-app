/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');

const { getActivationTemplates } = require('../../connect/api/misc');


module.exports = {
  key: 'activation_templates',
  noun: 'Activation_templates',

  display: {
    label: 'Get activation templates for product (asset).',
    description: 'Triggers when new activation templates.',
    hidden: true,
  },

  operation: {
    inputFields: [
      { key: 'id', label: 'Product ID', required: true },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return getActivationTemplates(client);
    },
    sample: {
      id: 'TL-000-000-000',
      title: 'Template',
    },

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'Title' },
    ],
  },
};
