/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const { fieldsToChoices } = require('./utils');

const FILTER_FIELDS = {
  id: {
    default: {
      key: 'id',
      label: 'Request ID',
      helpText: 'The unique billing request identifier.',
      placeholder: 'BRP-0000-0000-0000-0000',
      list: true,
    },
  },
  type: {
    default: {
      key: 'status',
      label: 'Asset status',
      helpText: 'The status of the recurring asset.',
      choices: {
        active: 'Active',
        new: 'New',
        processing: 'Processing',
        rejected: 'Rejected',
        suspended: 'Suspended',
        terminated: 'Terminated',
      },
      list: true,
    },
  },
  created_before: {
    default: {
      key: 'created_before',
      type: 'datetime',
      required: false,
      label: 'Created before',
    },
  },
  created_after: {
    default: {
      key: 'created_after',
      type: 'datetime',
      required: false,
      label: 'Created after',
    },
  },
  updated_before: {
    default: {
      key: 'updated_before',
      type: 'datetime',
      required: false,
      label: 'Updated before',
    },
  },
  updated_after: {
    default: {
      key: 'updated_after',
      type: 'datetime',
      required: false,
      label: 'Updated after',
    },
  },
  billing_period_uom: {
    default: {
      key: 'billing_period_uom',
      label: 'Asset Billing Period UOM',
      list: true,
      choices: {
        monthly: 'Monthly',
        yearly: 'Yearly',
      },
    },
  },
  billing_next_date_before: {
    default: {
      key: 'billing_next_date_before',
      type: 'datetime',
      required: false,
      label: 'Asset Billing Next Date before',
    },
  },
  billing_next_date_after: {
    default: {
      key: 'billing_next_date_after',
      type: 'datetime',
      required: false,
      label: 'Asset Billing Next Date after',
    },
  },
  external_id: {
    default: {
      key: 'external_id',
      label: 'Asset Exernal Id',
      list: true,
    },
  },
  external_uid: {
    default: {
      key: 'external_uid',
      label: 'Asset External UID',
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
  connection_id: {
    default: {
      key: 'connection_id',
      label: 'Asset Connection Id',
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
  hub_id: {
    default: {
      key: 'hub_id',
      label: 'Hub ID',
      type: 'string',
      list: true,
    },
  },
  asset_hub_name: {
    default: {
      key: 'hub_name',
      label: 'Hub Name',
      type: 'string',
      list: true,
    },
  },
  marketplace_id: {
    default: {
      key: 'marketplace_id',
      label: 'Marketplace Id',
      list: true,
    },
  },
  marketplace_name: {
    default: {
      key: 'marketplace_name',
      label: 'Marketplace Name',
      list: true,
    },
  },
  customer_id: {
    default: {
      key: 'customer_id',
      required: false,
      label: 'Customer ID',
      list: true,
    },
  },
  t1_id: {
    default: {
      key: 't1_id',
      required: false,
      label: 'Tier 1 ID',
      list: true,
    },
  },
  t2_id: {
    default: {
      key: 't2_id',
      required: false,
      label: 'Tier 2 ID',
      list: true,
    },
  },
};

const FILTERS_CHOICES = fieldsToChoices(FILTER_FIELDS);

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
    label: 'Additional filters',
    type: 'string',
    choices: FILTERS_CHOICES,
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for recurring assets.',
  },
  getFilterFields,
];
