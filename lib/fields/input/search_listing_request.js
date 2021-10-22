/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const FILTER_FIELDS = {
  id: {
    default: {
      key: 'id',
      label: 'Listing Request ID',
      helpText: 'Listing Request ID.',
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
  provider_id: {
    default: {
      key: 'provider_id',
      required: false,
      label: 'Distributor ID',
      list: false,
    },
  },
  vendor_id: {
    default: {
      key: 'vendor_id',
      required: false,
      label: 'Vendor ID',
      list: false,
    },
  },
  vendor_name: {
    default: {
      key: 'name_id',
      required: false,
      label: 'Vendor ID',
      list: false,
    },
  },
  contract_id: {
    default: {
      key: 'contract_id',
      required: false,
      label: 'Contract ID',
      list: false,
    },
  },
  contract_name: {
    default: {
      key: 'contract_id',
      required: false,
      label: 'Contract ID',
      list: false,
    },
  },
  status: {
    default: {
      key: 'status',
      label: 'Status',
      required: false,
      choices: {
        draft: 'Draft',
        reviewing: 'Reviewing',
        deploying: 'Deploying',
        canceled: 'Canceled',
        completed: 'Completed',
      },
      list: true,
    },
  },
  type: {
    default: {
      key: 'type',
      label: 'Type',
      required: false,
      choices: {
        new: 'New',
        update: 'Update',
        remove: 'Remove',
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
      id: 'Listing Request ID',
      marketplace_id: 'Marketplace ID',
      marketplace_name: 'Marketplace Name',
      product_id: 'Product ID',
      product_name: 'Product Name',
      provider_id: 'Distributor ID',
      vendor_id: 'Vendor ID',
      vendor_name: 'Vendor Name',
      contract_id: 'Contract ID',
      contract_name: 'Contract Name',
      status: 'Status',
      type: 'Type',
      created_before: 'Created before',
      created_after: 'Created after',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for Listing Request.',
  },
  getFilterFields,
];
