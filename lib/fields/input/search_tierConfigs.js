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
      label: 'Tier Configuration ID',
      helpText: 'The unique Tier Configuration identifier.',
      placeholder: 'TC-000-000-000',
      list: true,
    },
  },
  connection_type: {
    default: {
      key: 'connection_type',
      label: 'Connection Type',
      choices: {
        production: 'Production',
        test: 'Test',
        preview: 'Preview',
      },
      list: true,
    },
  },
  tier_level: {
    default: {
      key: 'tier_level',
      label: 'Tier Level',
      choices: {
        1: 'Tier 1',
        2: 'Tier 2',
      },
      list: true,
    },
  },
  environment: {
    default: {
      key: 'environment',
      label: 'Environment',
      required: false,
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
      label: 'Connection Id',
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
  account_id: {
    default: {
      key: 'account_id',
      required: false,
      label: 'Account ID',
      list: true,
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
      id: 'Tier Configuration ID',
      connection_id: 'Connection ID',
      connection_type: 'Connection Type',
      product_id: 'Product ID',
      account_id: 'Account ID',
      tier_level: 'Tier Level',
      environment: 'Environment',
    },
    required: false,
    altersDynamicFields: true,
    list: true,
    helpText: 'Add additional filters for obtaining tier configurations.',
  },
  getFilterFields,
];
