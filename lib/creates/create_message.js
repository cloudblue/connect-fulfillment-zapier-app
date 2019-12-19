/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/create_message');

const createMessage = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const conversations = await client.conversations.getConversationsByObjectId(bundle.inputData.id);
  if (conversations && conversations.length === 1) {
    const response = await client.conversations.createMessage(
      conversations[0].id,
      bundle.inputData.text,
    );
    return Promise.resolve(response);
  }
  throw new Error(`conversation for object id = ${bundle.inputData.id} not found`);
};


module.exports = {
  key: 'create_message',
  noun: 'Post Message',
  display: {
    label: 'Post Conversation Message',
    description: 'Post a message to a conversation.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Object ID',
        required: true,
        help: 'Enter the ID of the domain object to which the Conversation is linked.',
      },
      { key: 'text', label: 'Message', required: true },
    ],
    perform: createMessage,
    sample,
  },
};
