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
      label: 'Case ID',
      helpText: 'The unique case identifier.',
      placeholder: 'CA-000-000-000',
      list: false,
    },
  },
  status: {
    default: {
      key: 'state',
      label: 'Case Status',
      helpText: 'Using this filter only cases matching the requested status will be available for the Zap.',
      required: false,
      choices: {
        pending: 'Pending',
        inquiring: 'Inquiring',
        resolved: 'Resolved',
        closed: 'Closed',
      },
      list: false,
    },
  },
  priority: {
    default: {
      key: 'priority',
      label: 'Using this filter only cases matching the requested Priority will be available for the Zap.',
      choices: {
        0: 'Low',
        1: 'medium',
        2: 'High',
        3: 'Urgent',
      },
      list: false,
    },
  },
  from_account: {
    default: {
      key: 'from_account',
      label: 'Using this filter only cases matching the requested From Account will be available for the Zap.',
      placeholder: 'VA-000-000-000',
      list: false,
    },
  },
  from_actor: {
    default: {
      key: 'from_actor',
      label: 'Using this filter only cases matching the requested From Account will be available for the Zap.',
      placeholder: 'UR-000-000-000',
      list: false,
    },
  },
  to_actor: {
    default: {
      key: 'to_actor',
      label: 'Using this filter only cases matching the requested To Account will be available for the Zap.',
      placeholder: 'UR-000-000-000',
      list: false,
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
      id: 'Case ID',
      status: 'Case Status',
      priority: 'Priority',
      from_account: 'From Acccount',
      from_actor: 'From Actor',
      to_account: 'To Actor',
      created_after: 'Created After',
      created_before: 'Created Before',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for cases.',
  },

  getFilterFields,
];
