/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const tier2Fields = (z, bundle) => {
  if (bundle.inputData.reseller_tiers === 't2t1') {
    return [
      { key: 't2_external_id', label: 'Tier 2 External ID', required: true },
      { key: 't2_external_uid', label: 'Tier 2 External UID', required: false },
      { key: 't2_company_name', label: 'Tier 2 Company', required: true },
      { key: 't2_address2', label: 'Tier 2 Address Line 1', required: true },
      { key: 't2_address2', label: 'Tier 2 Address Line 2', required: false },
      { key: 't2_postal_code', label: 'Tier 2 Postal Code', required: true },
      { key: 't2_city', label: 'Tier 2 City', required: true },
      { key: 't2_state', label: 'Tier 2 State', required: true },
      { key: 't2_country', label: 'Tier 2 Country', required: true },
      { key: 't2_first_name', label: 'Tier 2 Contact First Name', required: true },
      { key: 't2_last_name', label: 'Tier 2 Contact Last Name', required: true },
      { key: 't2_email', label: 'Tier 2 Email', required: true },
      { key: 't2_phone', label: 'Tier 2 Phone Number', required: true },
    ];
  }
  return [];
};

const PURCHASE_FIELDS = [
  // general
  { key: 'connection_id', label: 'Connection ID', required: true },
  { key: 'asset_external_id', label: 'Asset External ID', required: true },
  { key: 'asset_external_uid', label: 'Asset External UID', required: false },
  {
    key: 'reseller_tiers',
    label: 'Reseller Tiers',
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
  // tier 1
  { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
  { key: 't1_external_uid', label: 'Tier 1 External UID', required: false },
  { key: 't1_company_name', label: 'Tier 1 Company', required: true },
  { key: 't1_address1', label: 'Tier 1 Address Line 1', required: true },
  { key: 't1_address2', label: 'Tier 1 Address Line 2', required: false },
  { key: 't1_postal_code', label: 'Tier 1 Postal Code', required: true },
  { key: 't1_city', label: 'Tier 1 City', required: true },
  { key: 't1_state', label: 'Tier 1 State', required: true },
  { key: 't1_country', label: 'Tier 1 Country', required: true },
  { key: 't1_first_name', label: 'Tier 1 Contact First Name', required: true },
  { key: 't1_last_name', label: 'Tier 1 Contact Last Name', required: true },
  { key: 't1_email', label: 'Tier 1 Email', required: true },
  { key: 't1_phone', label: 'Tier 1 Phone Number', required: true },
  { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
  // customer
  { key: 'customer_external_id', label: 'Customer External ID', required: true },
  { key: 'customer_external_uid', label: 'Customer External UID', required: false },
  { key: 'customer_company_name', label: 'Customer Company', required: true },
  { key: 'customer_address1', label: 'Customer Address Line 1', required: true },
  { key: 'customer_address2', label: 'Customer Address Line 2', required: false },
  { key: 'customer_postal_code', label: 'Customer Postal Code', required: true },
  { key: 'customer_city', label: 'Customer City', required: true },
  { key: 'customer_state', label: 'Customer State', required: true },
  { key: 'customer_country', label: 'Customer Country', required: true },
  { key: 'customer_first_name', label: 'Customer Contact First Name', required: true },
  { key: 'customer_last_name', label: 'Customer Contact Last Name', required: true },
  { key: 'customer_email', label: 'Customer Email', required: true },
  { key: 'customer_phone', label: 'Customer Phone Number', required: true },
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
    key: 'params',
    children: [
      {
        key: 'param_id',
        label: 'Param ID',
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
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
      },
      {
        key: 'old_quantity',
        label: 'Old Quantity',
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
        label: 'Param ID',
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

const CANCEL_FIELDS = [
  { key: 'asset_id', label: 'Asset ID', required: true },
  {
    key: 'external_attributes',
    children: [
      {
        key: 'param_id',
        label: 'Param ID',
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

const getFields = (z, bundle) => {
  if (bundle.inputData.request_type === 'purchase') {
    return PURCHASE_FIELDS;
  }
  if (bundle.inputData.request_type === 'change') {
    return CHANGE_FIELDS;
  }
  if (bundle.inputData.request_type === 'cancel') {
    return CANCEL_FIELDS;
  }
  return [];
};


module.exports = [
  {
    key: 'request_type',
    label: 'Request Type',
    type: 'string',
    choices: {
      purchase: 'Purchase Request',
      change: 'Change Request',
      cancel: 'Cancel Request',
    },
    required: true,
    altersDynamicFields: true,
    default: 'purchase',
  },
  getFields,
];
