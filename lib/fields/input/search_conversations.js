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
      label: 'Conversation ID',
      helpText: 'The unique conversation identifier.',
      placeholder: 'CO-000-000-000',
      list: false,
    },
  },
  instance_id: {
    default: {
      key: 'instance_id',
      label: 'Instance ID',
      helpText: 'This ide can see the identifier of Asset, PR, Tier configuration.',
      placeholder: 'PR-4786-4908-0381-001',
      list: false,
    },
  },
  created: {
    default: {
      key: 'created',
      label: 'Created',
      helpText: 'Date of the creation of the conversation.',
      placeholder: 'PR-4786-4908-0381-001',
      list: false,
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
      instance_id: 'This ide can see the identifier of Asset, PR, Tier configuration.',
      created: 'Date of the creation of the conversation.',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'This dropdown allows to add additional filters used to query for conversations.',
  },

  getFilterFields,
];
