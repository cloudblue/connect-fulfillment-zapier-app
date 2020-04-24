/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { FIELDS_CUSTOMER, FIELDS_TIER_1, FIELDS_TIER_2 } = require('./tiers');

const tier2Fields = (z, bundle) => {
  if (bundle.inputData.reseller_tiers === 't2t1') {
    return FIELDS_TIER_2;
  }
  return [];
};

const PURCHASE_FIELDS_HEAD = [
  {
    key: 'hub_id',
    label: 'Hub ID',
    required: true,
    helpText: 'Provide the ID of your hub obtained from Provider Portal Hubs module, '
      + 'this zap will place the request like such hub. ID of the hub must have the form of HB-XXXX-XXXX.',
  },
  {
    key: 'asset_external_id',
    label: 'Asset External ID',
    required: true,
    helpText: 'Provide the ID of the asset from the external system, '
      + 'for example pointing to a contract identifier or unique one that will map this asset with.',
  },
  {
    key: 'asset_external_uid',
    label: 'Asset External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the requested '
      + 'asset on the commerce system, in case it\'s not provided a unique UUID will be auto-generated.',
  },
  {
    key: 'reseller_tiers',
    label: 'Tiers involved in the request',
    helpText: 'Define how many tiers are involved in the request, at least Tier 1 (who sold the asset to customer) '
      + 'is required, in case of need you can also specify a chain up to 2 tiers.',
    type: 'string',
    choices: {
      t2t1: 'Tier 1 + Tier 2',
      t1: 'Tier 1',
    },
    required: true,
    altersDynamicFields: true,
    default: 't1',
  },
  // tier 2
  tier2Fields,
  ...FIELDS_TIER_1,
  ...FIELDS_CUSTOMER,
];

const PURCHASE_FIELDS_TAIL = [
  {
    key: 'params',
    dict: true,
    required: false,
    label: 'Parameters',
    helpText: 'Provide the list of parameters to set value, first field is to specify the '
      + 'parameter id as seen on CloudBlue Connect portals, the second field is to provide '
      + 'it\'s value. Please note that both can be populated from previous steps in the Zap.',
  },
];


const PURCHASE_FIELDS_LIS = [
  ...PURCHASE_FIELDS_HEAD,
  {
    key: 'items',
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
        helpText: 'The value of this field should be in form PRD-XXX-XXX-XXX-XXXX and can be seen in Provider portal in '
          + 'the items section of the concrete product you are creating a request for.',
      },
      {
        key: 'quantity',
        label: 'Quantity',
        required: true,
        helpText: 'Please note that quantities for reservation items must be integers, additionally '
          + 'in case you want to specify unlimited quantity you may use -1.',
      },
    ],
  },
  ...PURCHASE_FIELDS_TAIL,
];


const PURCHASE_FIELDS = [
  ...PURCHASE_FIELDS_HEAD,
  {
    key: 'items',
    dict: true,
    required: true,
    label: 'Items',
    helpText: 'Enter the Item ID and the Quantity for each item.',
  },
  ...PURCHASE_FIELDS_TAIL,
];


const CHANGE_FIELDS_LIS = [
  { key: 'asset_id', label: 'Asset ID', required: true },
  // items
  {
    key: 'items',
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
      },
      {
        key: 'quantity',
        label: 'Quantity',
        required: true,
      },
    ],
  },
  {
    key: 'external_attributes',
    children: [
      {
        key: 'param_id',
        label: 'Parameter ID',
        required: false,
      },
      {
        key: 'value',
        label: 'Value',
        required: false,
      },
    ],
  },
];

const CHANGE_FIELDS = [
  { key: 'asset_id', label: 'Asset ID', required: true },
  // items
  {
    key: 'items',
    dict: true,
    required: true,
    label: 'Items',
    helpText: 'Enter the Item ID and the new Quantity for each item.',
  },
  {
    key: 'external_attributes',
    dict: true,
    required: false,
    label: 'External Attributes',
    helpText: 'Enter the Parameter ID and the Parameter Value for each external attribute.',
  },
];

const SUSPEND_RESUME_CANCEL_FIELDS = [
  { key: 'asset_id', label: 'Asset ID', required: true },
  {
    key: 'external_attributes',
    children: [
      {
        key: 'param_id',
        label: 'Parameter ID',
        required: false,
      },
      {
        key: 'value',
        label: 'Value',
        required: false,
      },
    ],
  },
];

module.exports = {
  PURCHASE_FIELDS_LIS,
  PURCHASE_FIELDS,
  CHANGE_FIELDS_LIS,
  CHANGE_FIELDS,
  SUSPEND_RESUME_CANCEL_FIELDS,
};
