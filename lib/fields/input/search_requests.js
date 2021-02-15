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
  connection_type: {
    default: {
      key: 'connection_type',
      label: 'Asset Connection Type',
      choices: {
        production: 'Production',
        test: 'Test',
        preview: 'Preview',
      },
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
      list: true,
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
  marketplace_id: {
    default: {
      key: 'marketplace_id',
      label: 'Marketplace ID',
      type: 'string',
      list: true,
    },
  },
  marketplace_name: {
    default: {
      key: 'marketplace_name',
      required: false,
      label: 'Marketplace Name',
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
  asset_param_id: {
    default: {
      key: 'asset_param_id',
      required: false,
      label: 'Asset Parameter ID',
      list: true,
    },
  },
  asset_param_value: {
    default: {
      key: 'asset_param_value',
      required: false,
      label: 'Asset Parameter Value',
      list: true,
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

const FILTERS_CHOICES = fieldsToChoices(FILTER_FIELDS);

module.exports = [
  {
    key: 'status',
    label: 'Request Status',
    helpText: 'Using this filter only requests matching the requested status will be available for the Zap.',
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
  {
    key: 'filters',
    label: 'Additional filters',
    type: 'string',
    choices: FILTERS_CHOICES,
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for asset requests.',
  },
  getFilterFields,
];
