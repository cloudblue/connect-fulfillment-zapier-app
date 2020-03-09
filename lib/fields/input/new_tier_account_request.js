/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { FIELDS_ACCOUNT } = require('./tiers');

const REQUEST_FIELDS = [
  ...FIELDS_ACCOUNT,
  {
    key: 'type',
    type: 'string',
    required: false,
    computed: true,
    default: 'update',
  },
];

module.exports = REQUEST_FIELDS;
