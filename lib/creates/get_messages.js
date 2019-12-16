/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');
const getConnectClient = require('../utils').getConnectClient;

const getMessagesRequest = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.conversations.getMessages(
        bundle.inputData.id,
    );
    return Promise.resolve(response);
};

module.exports = {
    key: 'get_messages',
    noun: 'Get Messages Request',
    display: {
        label: 'Get new messages to a conversation request',
        description: 'Get new messagse to a conversation request.'
    },
    operation: {
        inputFields: [
            { key: 'id', label: 'Request ID', required: true },
        ],
        perform: getMessagesRequest,
        // sample: require('../samples/create_message'),
    },
};
