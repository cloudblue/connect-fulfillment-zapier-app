/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');
const getConnectClient = require('../utils').getConnectClient;


const noteRequest = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.requests.updateRequest(
        bundle.inputData.id,
        {
            note: bundle.inputData.note
        }
    );
    return Promise.resolve(response);
};


module.exports = {
    key: 'note_request',
    noun: 'Note Request',
    display: {
        label: 'Add Note to Request',
        description: 'Add Note to Request.'
    },
    operation: {
        inputFields: [
            { key: 'id', label: 'Request ID', required: true },
            { key: 'note', label: 'Note', required: true }
        ],
        perform: noteRequest,
        sample: require('../samples/note_request'),
    },
};
