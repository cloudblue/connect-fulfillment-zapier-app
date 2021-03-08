/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const sample = require('../../samples/case');
const inputFields = require('../../fields/input/search_cases');
const outputFields = require('../../fields/output/case');

const { searchCases } = require('../../connect/api/caseRequests/actions');

module.exports = {
  key: 'new_case',
  noun: 'Case',

  display: {
    label: 'New Case',
    description: 'Triggers when a new helpdesk case appears on the case queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields: inputFields.concat([
      {
        key: 'records_per_page',
        label: 'Amount of records per batch query',
        helpText: 'On each poll to CloudBlue Connect, Zapier will limit the results to the limit specified here, '
          + 'this option is especially useful in the case you are creating a Zap for an account either with a lot '
          + 'of requests or to limit the amount of samples obtained while designing the zap.',
        type: 'integer',
        default: '100',
        required: false,
      },
    ]),
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchCases(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
