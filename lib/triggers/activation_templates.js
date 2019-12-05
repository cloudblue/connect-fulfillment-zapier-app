/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const getConnectClient = require('../utils').getConnectClient;

const getActivationTemplates = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const templates = await client.products.getProductAssetTemplates();
  return Promise.resolve(templates);
};

module.exports = {
  key: 'activation_templates',
  noun: 'Activation_templates',

  display: {
    label: 'Get activation templates for product (asset).',
    description: 'Triggers when new activation templates.',
    hidden: true
  },

  operation: {
    inputFields: [
        {key: 'id', label: 'Product ID', required: true},
    ],
    perform: getActivationTemplates,
    sample: {
      id: 'TL-000-000-000',
      title: 'Template'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'title', label: 'Title'}
    ]
  }
};