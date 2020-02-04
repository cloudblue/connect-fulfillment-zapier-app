/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { createMessage } = require('../connect/api/misc');
const sample = require('../samples/create_message');


module.exports = {
  key: 'create_message',
  noun: 'Conversation Message',
  display: {
    label: 'Add Conversation Message',
    description: 'Vendors and providers can use this actions to include messages '
      + 'into a Request, this is useful to add notes to be seen by vendors and providers '
      + 'when checking the request, like for example why a request was rejected or the '
      + 'status of the request in a way that everybody can understand. This notes are seen on Connect UI.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Object ID',
        required: true,
        helpText: 'Provide the ID of the object to update, this can be a Asset Fulfillment Request, '
        + 'Tier Configuration Request or Listing Request. The value may come from previous steps in the Zap.',
      },
      {
        key: 'text',
        label: 'Message',
        required: true,
        helpText: 'Provide the message to be added to the conversation, please note that all actors '
          + 'who has access to the object could potentially see it, including vendors, providers and '
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
