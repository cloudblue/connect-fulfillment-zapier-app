/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/conversations');
const inputFields = require('../fields/input/search_conversations');
const outputFields = require('../fields/output/conversation');

const { searchConversations } = require('../connect/api/misc');

module.exports = {
  key: 'new_conversations',
  noun: 'Conversation',

  display: {
    label: 'New Conversation',
    description: 'Triggers when a new conversation appears on the conversations queue using polling to CloudBlue Connect.',
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
      {
        key: 'process_in_batch',
        label: 'Process requests in batch',
        helpText: 'This option when set to yes causes that zapier obtains all requests in your queue matching the different filters you specify '
          + 'in batches, each batch will be as big as specified in the previous option.',
        type: 'boolean',
        default: 'yes',
        required: false,
      },
    ]),
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchConversations(client, bundle.inputData, '-created');
    },
    sample,
    outputFields,
  },
};
