/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { FIELDS_ACCOUNT } = require('./tiers');

const REQUEST_FIELDS = [
  ...FIELDS_ACCOUNT,
];

module.exports = {
  REQUEST_FIELDS,
};
