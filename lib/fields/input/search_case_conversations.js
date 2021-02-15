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
      label: 'Case Conversation ID',
      helpText: 'The unique case conversation identifier.',
      placeholder: 'CO-000-000-000',
      list: false,
    },
  },
  text: {
    default: {
      key: 'text',
      label: 'Text',
      helpText: 'Text to search for.',
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

const FILTERS_CHOICES = fieldsToChoices(FILTER_FIELDS);

module.exports = [
  {
    key: 'case_id',
    label: 'Case id',
    type: 'string',
    required: true,
    helpText: 'This id corresponds of the case to search. ',
  },
  {
    key: 'filters',
    label: 'Additional filters',
    type: 'string',
    choices: FILTERS_CHOICES,
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for Case Conversations.',
  },

  getFilterFields,
];
