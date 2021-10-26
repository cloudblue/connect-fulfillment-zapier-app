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
      label: 'Conversation ID',
      helpText: 'The unique conversation identifier.',
      placeholder: 'CO-000-000-000',
      list: true,
    },
  },
  instance_id: {
    default: {
      key: 'instance_id',
      label: 'Instance ID',
      helpText: 'This is the identifier of the object to which the conversation refers '
                + '(Asset Request, Listing, Listing Request, etc)',
      list: true,
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
      id: 'Conversation ID',
      instance_id: 'Instance ID',
      created_before: 'Created before',
      created_after: 'Created after',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for conversations.',
  },

  getFilterFields,
];
