/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const { fieldsToChoices } = require('./utils');

const FILTER_FIELDS = {
  id: {
    default: {
      key: 'id',
      label: 'Request ID',
      helpText: 'The unique tier account request identifier.',
      placeholder: 'TAR-0000-0000-0000-001-001',
      list: true,
    },
  },
  status: {
    default: {
      key: 'status',
      label: 'Request Status',
      helpText: 'The status of the request.',
      choices: {
        pending: 'Pending',
        accepted: 'Accepted',
        ignored: 'Ignored',
        unsupported: 'Unsupported',
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
  provider_id: {
    default: {
      key: 'provider_id',
      required: false,
      label: 'Distributor ID',
      list: true,
    },
  },
  provider_name: {
    default: {
      key: 'provider_name',
      required: false,
      label: 'Distributor Name',
      list: true,
    },
  },
  account_id: {
    default: {
      key: 'account_id',
      required: false,
      label: 'Account ID',
      list: true,
    },
  },
  account_name: {
    default: {
      key: 'account_name',
      required: false,
      label: 'Account Name',
      list: true,
    },
  },
  account_external_id: {
    default: {
      key: 'account_external_id',
      required: false,
      label: 'Account External ID',
      list: true,
    },
  },
  account_external_uid: {
    default: {
      key: 'account_external_uid',
      required: false,
      label: 'Account External UID',
      list: true,
    },
  },
  account_environment: {
    default: {
      key: 'account_environment',
      required: false,
      label: 'Account Environment',
      list: true,
      choices: {
        preview: 'Preview',
        test: 'Test',
        production: 'Production',
      },
    },
  },
  account_scopes: {
    default: {
      key: 'account_scopes',
      required: false,
      label: 'Account Scope',
      choices: {
        'tier-1': 'Tier 1',
        'tier-2': 'Tier 2',
        customer: 'Customer',
      },
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
      label: 'Hub Name',
      type: 'string',
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
    helpText: 'This dropdown allows to add additional filters used to query for tier accounts requests.',
  },
  getFilterFields,
];
