/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/case');
const inputFields = require('../fields/input/search_cases');
const outputFields = require('../fields/output/case');

const { searchCases } = require('../connect/api/caseRequests/actions');
const { getConnectClient } = require('../connect/http');

module.exports = {
  key: 'search_cases',
  noun: 'Case',
  display: {
    label: 'Search a Case',
    description: 'Search for Cases.',
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchCases(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
