/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const FILTER_FIELDS = {
  id: {
    default: {
      key: 'id',
      label: 'Request ID',
      helpText: 'The unique request identifier.',
      placeholder: 'PR-0000-0000-0000-000',
      list: true,
    },
  },
  type: {
    default: {
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
  },
  asset_id: {
    default: {
      key: 'asset_id',
      required: false,
      label: 'Asset ID',
      list: true,
    },
  },
  product_id: {
    default: {
      key: 'product_id',
      required: false,
      label: 'Product ID',
      list: true,
    },
  },
  product_name: {
    default: {
      key: 'product_name',
      required: false,
      label: 'Product Name',
      list: true,
    },
  },
  hub_id: {
    default: {
      key: 'hub_id',
      label: 'Hub ID',
      type: 'string',
      list: false,
    },
    provider: {
      dynamic: 'hubs.id.name',
    },
  },
  hub_name: {
    default: {
      key: 'hub_name',
      required: false,
      label: 'Hub Name',
      list: true,
    },
  },
  provider_id: {
    default: {
      key: 'provider_id',
      required: false,
      label: 'Provider ID',
      list: true,
    },
  },
  provider_name: {
    default: {
      key: 'provider_name',
      required: false,
      label: 'Provider Name',
      list: true,
    },
  },
  vendor_id: {
    default: {
      key: 'vendor_id',
      required: false,
      label: 'Vendor ID',
      list: true,
    },
  },
  vendor_name: {
    default: {
      key: 'vendor_name',
      required: false,
      label: 'Vendor Name',
      list: true,
    },
  },
  customer_id: {
    default: {
      key: 'customer_id',
      required: false,
      label: 'Customer ID',
    },
  },
  t1_id: {
    default: {
      key: 't1_id',
      required: false,
      label: 'Tier 1 ID',
    },
  },
  t2_id: {
    default: {
      key: 't2_id',
      required: false,
      label: 'Tier 2 ID',
    },
  },
};


async function getFilterFields(z, bundle) {
  const fields = [];
  _.forEach(_.uniq(bundle.inputData.filters), (value) => {
    if (_.has(FILTER_FIELDS, value)) {
      // get the field definition
      const fieldDefinition = FILTER_FIELDS[value];
      const actualField = _.assign(
        {}, fieldDefinition.default, fieldDefinition[bundle.authData.account_type],
      );
      fields.push(actualField);
    }
  });
  return fields;
}


module.exports = [
  {
    key: 'filters',
    label: 'Choose a filter field',
    type: 'string',
    choices: {
      id: 'Request ID',
      type: 'Request Type',
      asset_id: 'Asset ID',
      product_id: 'Product ID',
      product_name: 'Product Name',
      hub_id: 'Hub ID',
      hub_name: 'Hub Name',
      provider_id: 'Provider ID',
      provider_name: 'Provider Name',
      vendor_id: 'Vendor ID',
      vendor_name: 'Vendor Name',
      customer_id: 'Customer ID',
      t1_id: 'Tier 1 ID',
      t2_id: 'Tier 2 ID',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'Choose filter fields you want to include in search.',
  },
  {
    key: 'status',
    required: false,
    choices: {
      pending: 'Pending',
      inquiring: 'Inquiring',
      tiers_setup: 'Tier setup',
      approved: 'Approved',
      failed: 'Failed',
    },
    list: true,
  },
  getFilterFields,
];
