/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/get_messages');

const getMessagesRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const conversations = await client.conversations.getConversationsByObjectId(bundle.inputData.id);
  const response = await client.conversations.get(conversations[0].id);
  return Promise.resolve(response.messages);
};

module.exports = {
  key: 'get_messages',
  noun: 'Get messages',
  display: {
    label: 'Get Messages',
    description: 'Triggers when new messages appears on a conversation or listing request. Please provide the ID of the object to get related messages',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Id of the request or listing to retrieve messages for',
        required: true,
        list: false,
      },
    ],
    perform: getMessagesRequest,
    sample,
  },
};
