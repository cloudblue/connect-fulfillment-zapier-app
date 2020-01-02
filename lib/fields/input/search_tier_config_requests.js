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
      helpText: 'The unique tier config request identifier.',
      placeholder: 'TCR-000-000-000-000',
      list: true,
    },
  },
  type: {
    default: {
      key: 'type',
      label: 'Request Type',
      helpText: 'The type of the request.',
      choices: {
        setup: 'Setup',
        update: 'Update',
      },
      list: true,
    },
  },
  configuration_id: {
    default: {
      key: 'configuration_id',
      required: false,
      label: 'Configuration ID',
      list: true,
    },
  },
  configuration_tier_level: {
    default: {
      key: 'configuration_tier_level',
      required: false,
      label: 'Tier Level',
      choices: {
          '1': 'Tier 1',
          '2': 'Tier 2',
      },
      list: true,
    },
  },
  configuration_account_id: {
    default: {
      key: 'configuration_account_id',
      required: false,
      label: 'Tier Account ID',
      list: true,
    },
  },
  configuration_product_id: {
    default: {
      key: 'configuration_product_id',
      label: 'Product ID',
      type: 'string',
      list: false,
    },
  },
  configuration_account_external_uid: {
    default: {
      key: 'configuration_account_external_uid',
      required: false,
      label: 'Tier Account External UID',
      list: true,
    },
  },
  assignee_id: {
    default: {
      key: 'assignee_id',
      required: false,
      label: 'Assignee ID',
    },
  },
  unassigned: {
    default: {
      key: 'unassigned',
      required: false,
      label: 'Unassigned',
      type: 'boolean',
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
      configuration_id: 'Configuration ID',
      configuration_tier_level: 'Tier Level',
      configuration_account_id: 'Tier Account ID',
      configuration_account_external_uid: 'Tier Account External UID',
      configuration_product_id: 'Product ID',
      assignee_id: 'Assignee ID',
      unassigned: 'Unassigned',
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