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
      key: 'type',
      label: 'Request Type',
      helpText: 'The type of the request.',
      choices: {
        provider: 'Provider',
        vendor: 'Vendor',
      },
      list: true,
    },
  },
  period_uom: {
    default: {
      key: 'period_uom',
      required: false,
      label: 'Period UOM',
      choices: {
        monthly: 'Monthly',
        yearly: 'Yearly',
      },
      list: true,
    },
  },
  period_from_before: {
    default: {
      key: 'period_from_before',
      type: 'datetime',
      required: false,
      label: 'Period From before',
    },
  },
  period_from_after: {
    default: {
      key: 'period_from_after',
      type: 'datetime',
      required: false,
      label: 'Period From after',
    },
  },
  period_to_before: {
    default: {
      key: 'period_to_before',
      type: 'datetime',
      required: false,
      label: 'Period To before',
    },
  },
  period_to_after: {
    default: {
      key: 'period_to_before',
      type: 'datetime',
      required: false,
      label: 'Period To before',
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
  asset_id: {
    default: {
      key: 'asset_id',
      label: 'Asset ID',
      helpText: 'The unique asset identifier.',
      placeholder: 'AS-0000-0000-0000',
      list: true,
    },
  },
  asset_billing_period_uom: {
    default: {
      key: 'asset_billing_period_uom',
      label: 'Asset Billing Period UOM',
      list: true,
    },
  },
  asset_billing_next_date_before: {
    default: {
      key: 'asset_billing_next_date_before',
      type: 'datetime',
      required: false,
      label: 'Asset Billing Next Date before',
    },
  },
  asset_billing_next_date_after: {
    default: {
      key: 'asset_billing_next_date_after',
      type: 'datetime',
      required: false,
      label: 'Asset Billing Next Date after',
    },
  },
  asset_external_id: {
    default: {
      key: 'asset_external_id',
      label: 'Asset Exernal Id',
      list: true,
    },
  },
  asset_external_uid: {
    default: {
      key: 'asset_external_uid',
      label: 'Asset External UID',
      list: true,
    },
  },
  asset_product_id: {
    default: {
      key: 'asset_product_id',
      required: false,
      label: 'Product ID',
      list: true,
    },
  },
  asset_product_name: {
    default: {
      key: 'asset_product_name',
      required: false,
      label: 'Product Name',
      list: true,
    },
  },
  asset_connection_id: {
    default: {
      key: 'asset_connection_id',
      label: 'Asset Connection Id',
      list: true,
    },
  },
  asset_provider_id: {
    default: {
      key: 'asset_provider_id',
      required: false,
      label: 'Provider ID',
      list: true,
    },
  },
  asset_provider_name: {
    default: {
      key: 'asset_provider_name',
      required: false,
      label: 'Provider Name',
      list: true,
    },
  },
  asset_vendor_id: {
    default: {
      key: 'asset_vendor_id',
      required: false,
      label: 'Vendor ID',
      list: true,
    },
  },
  asset_vendor_name: {
    default: {
      key: 'asset_vendor_name',
      required: false,
      label: 'Vendor Name',
      list: true,
    },
  },
  asset_hub_id: {
    default: {
      key: 'asset_hub_id',
      label: 'Hub ID',
      type: 'string',
      list: true,
    },
  },
  asset_hub_name: {
    default: {
      key: 'asset_hub_name',
      label: 'Hub Name',
      type: 'string',
      list: true,
    },
  },
  asset_marketplace_id: {
    default: {
      key: 'asset_marketplace_id',
      label: 'Marketplace Id',
      list: true,
    },
  },
  asset_marketplace_name: {
    default: {
      key: 'asset_marketplace_name',
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
  asset_t1_id: {
    default: {
      key: 'asset_t1_id',
      required: false,
      label: 'Tier 1 ID',
      list: true,
    },
  },
  asset_t2_id: {
    default: {
      key: 'asset_t2_id',
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
    helpText: 'This dropdown allows to add additional filters used to query for billing requests.',
  },
  getFilterFields,
];
