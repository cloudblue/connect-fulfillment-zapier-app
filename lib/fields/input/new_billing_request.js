/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const BILLING_REQUEST_FIELDS = [
  {
    key: 'asset_lookup_field',
    label: 'Asset Lookup Field',
    required: true,
    choices: {
      asset_id: 'Asset ID',
      asset_external_uid: 'Asset External UID',
    },
    helpText: 'Choose the field you want to use to identify the asset.',
  },
  {
    key: 'asset_lookup_value',
    label: 'Asset Lookup Value',
    required: true,
    helpText: 'Provide the Asset identifier.',
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
    key: 'attributes',
    dict: true,
    required: false,
    label: 'Attributes',
  },
];


module.exports = {
  BILLING_REQUEST_FIELDS,
};
