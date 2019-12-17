/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

 /*
   {
    key: 'hub_name',
    required: false,
    label: 'Hub Name',
    list: true,
  },
*/

const _ = require('lodash');

async function hubFields(z, bundle) {
  // if (bundle.inputData.flt_by_hub === undefined || bundle.inputData.flt_by_hub === 'no') {
  //   return [];
  // }
  const fields = [];
  _.forEach(bundle.inputData.filters, (value) => {
    if (value === 'hub_id') {
      fields.push({
        key: 'hub_id',
        label: 'Hub ID',
        type: 'string',
        list: true,
      });
    }
    if (value === 'hub_name') {
      fields.push({
        key: 'hub_name',
        required: false,
        label: 'Hub Name',
        list: true,
      });
    }
  });
  // if (bundle.authData.account_type === 'provider') {
  //   field.dynamic = 'hubs.id.name';
  // }
  return fields;
}


module.exports = [
  {
    key: 'filters',
    label: 'Choose filters',
    type: 'string',
    choices: {
      hub_id: 'Hub ID',
      hub_name: 'Hub Name',
    },
    required: true,
    altersDynamicFields: true,
    list: true,
  },
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
      billing: 'Billing',
      cancel: 'Cancel',
    },
    list: true,
  },
  {
    key: 'status',
    required: false,
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
    key: 'asset_id',
    required: false,
    label: 'Asset ID',
    list: true,
  },
  {
    key: 'product_id',
    required: false,
    label: 'Product ID',
    // dynamic: 'latest_published_products.id.name',
    list: true,
  },
  {
    key: 'product_name',
    required: false,
    label: 'Product Name',
    list: true,
  },
  hubFields,
  // {
  //   key: 'hub_id',
  //   required: false,
  //   label: 'Hub ID',
  //   list: true,
  // },
  {
    key: 'provider_id',
    required: false,
    label: 'Provider ID',
    list: true,
  },
  {
    key: 'provider_name',
    required: false,
    label: 'Provider Name',
    list: true,
  },
  {
    key: 'vendor_id',
    required: false,
    label: 'Vendor ID',
    list: true,
  },
  {
    key: 'vendor_name',
    required: false,
    label: 'Vendor Name',
    list: true,
  },
  {
    key: 'customer_id',
    required: false,
    label: 'Customer ID',
  },
  {
    key: 't1_id',
    required: false,
    label: 'Tier 1 ID',
  },
  {
    key: 't2_id',
    required: false,
    label: 'Tier 2 ID',
  },
];
