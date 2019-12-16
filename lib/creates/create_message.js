/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');


const createMessage = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.conversations.createMessage(
        bundle.inputData.id,
        bundle.inputData.text,
    );
    return Promise.resolve(response);
};


module.exports = {
    key: 'create_message',
    noun: 'Create Message Request',
    display: {
        label: 'Add message to a conversation request',
        description: 'Add message to a conversation request.'
    },
    operation: {
        inputFields: [
            { key: 'id', label: 'Request ID', required: true },
            { key: 'text', label: 'Message', required: true }
        ],
        perform: createMessage,
        sample: require('../samples/create_message'),
    },
};
