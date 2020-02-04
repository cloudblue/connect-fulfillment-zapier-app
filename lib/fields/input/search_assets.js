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
      label: 'Asset ID',
      helpText: 'The unique asset identifier.',
      placeholder: 'AS-0000-0000-0000',
      list: true,
    },
  },
  status: {
    default: {
      key: 'status',
      label: 'Asset Status',
      helpText: 'Using this filter only assets matching the requested status will be available for the Zap.',
      required: false,
      choices: {
        new: 'New',
        active: 'Active',
        processing: 'Processing',
        rejected: 'Rejected',
        suspended: 'Suspended',
        terminated: 'Terminated',
      },
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
  connection_id: {
    default: {
      key: 'connection_id',
      label: 'Asset Connection Id',
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
  product_id: {
    default: {
      key: 'product_id',
      required: false,
      label: 'Product ID',
      list: true,
    },
  },
  contract_id: {
    default: {
      key: 'contract_id',
      required: false,
      label: 'Contract ID',
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
  provider_id: {
    default: {
      key: 'provider_id',
      required: false,
      label: 'Provider ID',
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
      id: 'Asset ID',
      status: 'Asset Status',
      connection_id: 'Connection ID',
      connection_type: 'Connection Type',
      marketplace_id: 'Marketplace ID',
      product_id: 'Product ID',
      contract_id: 'Contract ID',
      hub_id: 'Hub ID',
      provider_id: 'Provider ID',
      customer_id: 'Customer ID',
      t1_id: 'Tier 1 ID',
      t2_id: 'Tier 2 ID',
      created_before: 'Created before',
      created_after: 'Created after',
      updated_before: 'Updated before',
      updated_after: 'Updated after',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'Add additional filters for obtaining assets.',
  },

  getFilterFields,
];
