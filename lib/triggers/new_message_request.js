/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/get_messages');

const getMessagesRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.conversations.getMessages(bundle.inputData.id);
  return Promise.resolve(response);
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
