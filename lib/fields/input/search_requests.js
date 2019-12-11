/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


module.exports = [
  {
    key: 'id',
    label: 'Request ID',
    helpText: 'The unique request identifier.',
    placeholder: 'PR-0000-0000-0000-000',
    list: true,
  },
  {
    key: 'type',
    label: 'Request Type',
    helpText: 'The type of the request.',
    choices: {
      purchase: 'Purchase',
      change: 'Change',
      suspend: 'Suspend',
      resume: 'Resume',
      renew: 'Renew',
      cancel: 'Cancel',
    },
    list: true,
  },
  {
    key: 'status',
    required: true,
    choices: {
      pending: 'Pending',
      inquiring: 'Inquiring',
      approved: 'Approved',
      failed: 'Failed',
      tiers_setup: 'Tier setup',
    },
    list: true,
  },
  {
    key: 'product',
    required: true,
    label: 'Product',
    dynamic: 'latest_published_products.id.name',
    list: true,
  },
];
