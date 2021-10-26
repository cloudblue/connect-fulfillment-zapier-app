/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const BILLING_REQUEST_LIS_FIELDS = [
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
    placeholder: 'YYYY-MM-DDThh:mm:ss+hh:mm',
    helpText: 'Date from which the asset will be billed as an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
  },
  {
    key: 'period_to',
    label: 'Period To',
    required: true,
    type: 'datetime',
    placeholder: 'YYYY-MM-DDThh:mm:ss+hh:mm',
    helpText: 'Date until which the asset will be billed as an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
  },
  {
    key: 'period_delta',
    label: 'Period Delta',
    type: 'number',
    required: true,
    helpText: 'Please specify for how many billing periods this request is for, '
      + 'for example if you specify here the number 1 and the UOM is Month it means '
      + 'that this billing request is for 1 month.',
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
    helpText: 'Provide the Unit of Measure for the Billing Period, '
      + 'this one could be month or year.',
  },
  {
    key: 'items',
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
        helpText: 'This one is the SKU of the item to bill and can be seen in Distributor portal in '
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
    placeholder: 'YYYY-MM-DDThh:mm:ss+hh:mm',
    helpText: 'Date from which the asset will be billed as an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
  },
  {
    key: 'period_to',
    label: 'Period To',
    required: true,
    type: 'datetime',
    placeholder: 'YYYY-MM-DDThh:mm:ss+hh:mm',
    helpText: 'Date until which the asset will be billed as an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
  },
  {
    key: 'period_delta',
    label: 'Period Delta',
    type: 'number',
    required: true,
    helpText: 'Please specify for how many billing periods this request is for, '
      + 'for example if you specify here the number 1 and the UOM is Month it means '
      + 'that this billing request is for 1 month.',
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
    helpText: 'Provide the Unit of Measure for the Billing Period, '
      + 'this one could be month or year.',
  },
  {
    key: 'items',
    list: true,
    required: true,
    label: 'Items',
    helpText: 'This one is the SKU of the item to bill and can be seen in Distributor portal in '
    + 'the items section of the concrete product you are creating a request for. Enter a list of Item ID.',
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
  BILLING_REQUEST_LIS_FIELDS,
};
