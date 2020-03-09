/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const PROVIDER_FIELDS = [
  {
    key: 'asset_external_uid',
    label: 'Asset External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the requested '
      + 'asset on the commerce system, in case it\'s not provided a unique UUID will be auto-generated.',
  },
  {
    key: 'provider_external_id',
    label: 'Provider External ID',
    required: true,
    helpText: 'Provide the ID of the provider from the external system.',
  },
  {
    key: 'period_from',
    label: 'Period From',
    type: 'datetime',
    required: true,
    helpText: 'Date from which the asset will be billed.',
  },
  {
    key: 'period_to',
    label: 'Period To',
    required: true,
    type: 'datetime',
    helpText: 'Date until which the asset will be billed.',
  },
  {
    key: 'period_delta',
    label: 'Period Delta',
    type: 'number',
    required: true,
  },
  {
    key: 'period_uom',
    label: 'Period UOM',
    type: 'string',
    choices: {
      monthly: 'Monthly',
      yearly: 'Yearly',
    },
    required: true,
  },
  {
    key: 'items',
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
        helpText: 'This one is the SKU of the item to bill and can be seen in Provider portal in '
          + 'the items section of the concrete product you are creating a request for.',
      },
    ],
  },
  {
    key: 'type',
    type: 'string',
    required: false,
    computed: true,
    default: 'provider',
  },
];

const VENDOR_FIELDS = [
  { key: 'asset_id', label: 'Asset ID', required: true },
  {
    key: 'vendor_external_id',
    label: 'Vendor External ID',
    required: true,
    helpText: 'Provide the ID of the vendor from the external system.',
  },
  {
    key: 'type',
    type: 'string',
    required: false,
    computed: true,
    default: 'vendor',
  },
];

const getCreateFields = (z, bundle) => {
  if (bundle.authData.account_type === 'provider') {
    return PROVIDER_FIELDS;
  }
  if (bundle.authData.account_type === 'vendor') {
    return VENDOR_FIELDS;
  }
  return [];
};

module.exports = {
  PROVIDER_FIELDS,
  VENDOR_FIELDS,
  getCreateFields,
};
