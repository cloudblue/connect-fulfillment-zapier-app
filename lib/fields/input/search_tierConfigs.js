/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const FILTER_FIELDS = {
  id: {
    default: {
      key: 'id',
      label: 'Tier Configuration ID',
      helpText: 'The unique Tier Configuration identifier.',
      placeholder: 'TC-000-000-000',
      list: false,
    },
  },
  connection_type: {
    default: {
      key: 'connection_type',
      label: 'Connection Type',
      choices: {
        production: 'Production',
        test: 'Test',
        preview: 'Preview',
      },
      list: false,
    },
  },
  tier_level: {
    default: {
      key: 'tier_level',
      label: 'Tier Level',
      choices: {
        1: 'Tier 1',
        2: 'Tier 2',
      },
      list: false,
    },
  },
  connection_id: {
    default: {
      key: 'connection_id',
      label: 'Connection ID',
      list: false,
    },
  },
  marketplace_id: {
    default: {
      key: 'marketplace_id',
      label: 'Marketplace ID',
      list: false,
    },
  },
  marketplace_name: {
    default: {
      key: 'marketplace_name',
      label: 'Marketplace Name',
      list: false,
    },
  },
  contract_id: {
    default: {
      key: 'contract_id',
      label: 'Contract ID',
      list: false,
    },
  },
  product_id: {
    default: {
      key: 'product_id',
      required: false,
      label: 'Product ID',
      list: false,
    },
  },
  product_name: {
    default: {
      key: 'product_name',
      required: false,
      label: 'Product Name',
      list: false,
    },
  },
  account_id: {
    default: {
      key: 'account_id',
      required: false,
      label: 'Account ID',
      list: false,
    },
  },
  account_company_name: {
    default: {
      key: 'account_company_name',
      required: false,
      label: 'Account Company Name',
      list: false,
    },
  },
  status: {
    default: {
      key: 'status',
      label: 'Status',
      required: false,
      choices: {
        processing: 'Processing',
        active: 'Active',
        tiers_setup: 'Tier setup',
        approved: 'Approved',
        failed: 'Failed',
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
    label: 'Additional filters',
    type: 'string',
    choices: {
      id: 'Tier Configuration ID',
      tier_level: 'Tier Level',
      contract_id: 'Contract ID',
      connection_id: 'Connection ID',
      connection_type: 'Connection Type',
      marketplace_id: 'Marketplace ID',
      marketplace_name: 'Marketplace Name',
      product_id: 'Product ID',
      product_name: 'Product Name',
      account_id: 'Account ID',
      account_company_name: 'Account Company Name',
      status: 'Status',
      created_before: 'Created before',
      created_after: 'Created after',
      updated_before: 'Updated before',
      updated_after: 'Updated after',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for tier configurations.',
  },
  getFilterFields,
];
