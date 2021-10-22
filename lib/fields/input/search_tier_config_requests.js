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
        1: 'Tier 1',
        2: 'Tier 2',
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
      dynamic: 'account_users.id.name',
    },
  },
  param_id: {
    default: {
      key: 'param_id',
      required: false,
      label: 'Parameter ID',
      list: true,
    },
  },
  param_value: {
    default: {
      key: 'param_value',
      required: false,
      label: 'Parameter Value',
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
    helpText: 'This dropdown allows to add additional filters used to query for tier configurations requests.',
  },
  getFilterFields,
];
