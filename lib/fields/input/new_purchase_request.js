/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const tier2Fields = (z, bundle) => {
  if (bundle.inputData.reseller_tiers === 't2t1') {
    return [
      { key: 't2_external_id', label: 'T2 External ID', required: false },
      { key: 't2_external_uid', label: 'T2 External UID', required: false },
      { key: 't2_company_name', label: 'T2 Company', required: true },
      { key: 't2_address2', label: 'T2 Address Line 1', required: true },
      { key: 't2_address2', label: 'T2 Address Line 2', required: false },
      { key: 't2_postal_code', label: 'T2 Postal Code', required: true },
      { key: 't2_city', label: 'T2 City', required: true },
      { key: 't2_state', label: 'T2 State', required: true },
      { key: 't2_country', label: 'T2 Country', required: true },
      { key: 't2_first_name', label: 'T2 Contact First Name', required: true },
      { key: 't2_last_name', label: 'T2 Contact Last Name', required: true },
      { key: 't2_email', label: 'T2 Email', required: true },
      { key: 't2_phone', label: 'T2 Phone Number', required: true },
    ];
  }
  return [];
};

module.exports = [
  // general
  { key: 'connection_id', label: 'Connection ID', required: true },
  {
    key: 'reseller_tiers',
    label: 'Reseller Tiers',
    type: 'string',
    choices: {
      t2t1: 'T1 + T2',
      t1: 'T1',
    },
    required: true,
    altersDynamicFields: true,
    default: 't1',
  },
  // tier 2
  tier2Fields,
  // tier 1
  { key: 't1_external_id', label: 'T1 External ID', required: false },
  { key: 't1_external_uid', label: 'T1 External UID', required: false },
  { key: 't1_company_name', label: 'T1 Company', required: true },
  { key: 't1_address1', label: 'T1 Address Line 1', required: true },
  { key: 't1_address2', label: 'T1 Address Line 2', required: false },
  { key: 't1_postal_code', label: 'T1 Postal Code', required: true },
  { key: 't1_city', label: 'T1 City', required: true },
  { key: 't1_state', label: 'T1 State', required: true },
  { key: 't1_country', label: 'T1 Country', required: true },
  { key: 't1_first_name', label: 'T1 Contact First Name', required: true },
  { key: 't1_last_name', label: 'T1 Contact Last Name', required: true },
  { key: 't1_email', label: 'T1 Email', required: true },
  { key: 't1_phone', label: 'T1 Phone Number', required: true },
  { key: 't1_external_id', label: 'T1 External ID', required: true },
  // customer
  { key: 'customer_external_id', label: 'Customer External ID', required: false },
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
        required: true,
      },
      {
        key: 'value',
        label: 'Value',
        required: true,
      },
    ],
  },
];
