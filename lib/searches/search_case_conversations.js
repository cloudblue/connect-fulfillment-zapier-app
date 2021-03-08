/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/case_conversation');
const inputFields = require('../fields/input/search_case_conversations');
const outputFields = require('../fields/output/case_conversation');

const { searchCaseComments } = require('../connect/api/caseRequests/actions');
const { getConnectClient } = require('../connect/http');

module.exports = {
  key: 'search_comments',
  noun: 'Comments',
  display: {
    label: 'Search for Comments by Case.',
    description: 'Search for Comments by Case.',
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchCaseComments(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
