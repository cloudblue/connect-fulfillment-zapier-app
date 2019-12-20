/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const _ = require('lodash');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/get_messages');

const getMessagesRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const conversations = await client.conversations.getConversationsByObjectId(bundle.inputData.id);
  if (conversations && conversations.length === 1) {
    const response = await client.conversations.getConversation(conversations[0].id);
    const messages = Promise.resolve(response.messages);
    console.log('=============================');
    console.log(messages);
    console.log('=============================');
    return messages; 

  }
};

module.exports = {
  key: 'get_messages',
  noun: 'Get messages',

  display: {
    label: 'Get Messages',
    description: 'Triggers when new messages requests are available.',
  },

  operation: {
    inputFields: [
      {
        key: 'id',
        required: true,
        list: true,
      },
    ],

    perform: getMessagesRequest,

    sample,
  },
};
