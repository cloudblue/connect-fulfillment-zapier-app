/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { createMessage } = require('../connect/api/misc');
const sample = require('../samples/create_message');

module.exports = {
  key: 'create_message',
  noun: 'Conversation Message',
  display: {
    label: 'Add Conversation Message',
    description: 'Vendors and providers can use this actions to add messages '
      + 'to conversations on multiple objects like asset requests, this messages '
      + 'can be seen by vendors and providers and can provide valuable information like '
      + 'reason why a request has not been approved.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Object ID',
        required: true,
        helpText: 'Provide the ID of the object to update, this can be an Asset Fulfillment Request, '
        + 'Tier Configuration Request or Listing Request. The value may come from previous steps in the Zap.',
      },
      {
        key: 'text',
        label: 'Message',
        required: true,
        helpText: 'Provide the message to be added to the conversation, please note that all actors '
          + 'with access to the object may see it, including vendors, providers and '
          + 'in some cases propagated to external systems.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createMessage(client, bundle.inputData);
    },
    sample,
  },
};
