/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/asset');
const inputFields = require('../fields/input/search_conversations');
const outputFields = require('../fields/output/conversation');

const { searchConversations } = require('../connect/api/misc');
const { getConnectClient } = require('../connect/http');


module.exports = {
  key: 'search_conversations',
  noun: 'Conversations',
  display: {
    label: 'Search for Conversations.',
    description: 'Search for Conversations.',
  },

  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchConversations(client, bundle.inputData, '-created');
    },
    sample,
    outputFields,
  },
};
