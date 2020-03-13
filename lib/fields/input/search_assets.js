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
      label: 'Asset ID',
      helpText: 'The unique asset identifier.',
      placeholder: 'AS-0000-0000-0000',
      list: false,
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
      list: false,
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
      list: false,
    },
  },
  connection_id: {
    default: {
      key: 'connection_id',
      label: 'Asset Connection Id',
      list: false,
    },
  },
  external_id: {
    default: {
      key: 'external_id',
      label: 'Asset Exernal Id',
      list: false,
    },
  },
  external_uid: {
    default: {
      key: 'external_uid',
      label: 'Asset External UID',
      list: false,
    },
  },
  external_name: {
    default: {
      key: 'external_name',
      label: 'Asset External Name',
      list: false,
    },
  },
  marketplace_id: {
    default: {
      key: 'marketplace_id',
      label: 'Marketplace Id',
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
  product_title: {
    default: {
      key: 'product_title',
      required: false,
      label: 'Product Title',
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
      label: 'Hub Name',
      type: 'string',
      list: false,
    },
  },
  provider_id: {
    default: {
      key: 'provider_id',
      required: false,
      label: 'Provider ID',
      list: false,
    },
  },
  customer_id: {
    default: {
      key: 'customer_id',
      required: false,
      label: 'Customer ID',
    },
  },
  customer_name: {
    default: {
      key: 'customer_name',
      required: false,
      label: 'Customer Name',
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
      helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
    },
  },
  created_after: {
    default: {
      key: 'created_after',
      type: 'datetime',
      required: false,
      label: 'Created after',
      helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
    },
  },
  updated_before: {
    default: {
      key: 'updated_before',
      type: 'datetime',
      required: false,
      label: 'Updated before',
      helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
    },
  },
  updated_after: {
    default: {
      key: 'updated_after',
      type: 'datetime',
      required: false,
      label: 'Updated after',
      helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
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
      external_id: 'Asset External ID',
      external_uid: 'Asset External UID',
      external_name: 'Asset External Name',
      status: 'Asset Status',
      product_id: 'Product ID',
      product_title: 'Product Title',
      connection_id: 'Connection ID',
      connection_type: 'Connection Type',
      marketplace_id: 'Marketplace ID',
      marketplace_name: 'Marketplace Name',
      hub_id: 'Hub ID',
      hub_name: 'Hub Name',
      provider_id: 'Provider ID',
      contract_id: 'Contract ID',
      customer_id: 'Customer ID',
      customer_name: 'Customer Name',
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
    helpText: 'This dropdown allows to add additional filters used to query for assets.',
  },

  getFilterFields,
];
