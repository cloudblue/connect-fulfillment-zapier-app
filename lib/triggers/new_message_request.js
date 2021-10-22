/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { getMessagesByObjectId } = require('../connect/api/misc');
const sample = require('../samples/get_messages');


module.exports = {
  key: 'get_messages',
  noun: 'Message',
  display: {
    label: 'Get Conversation Messages',
    description: 'Triggers when new messages appears on multiple '
      + 'Connect objects like asset or listing requests. This trigger uses polling to CloudBlue Connect.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Id of the request or listing to retrieve messages for',
        helpText: 'Provide the ID of the fulfillment, tier config or listing '
          + 'request to obtain related conversation messages, newly obtained messages will be available to this Zap.',
        required: true,
        list: false,
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return getMessagesByObjectId(client, bundle.inputData);
    },
    sample,
  },
};
