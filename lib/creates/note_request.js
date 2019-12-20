/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/note_request');

const noteRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.updateRequest(
    bundle.inputData.id,
    {
      note: bundle.inputData.note,
    },
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'note_request',
  noun: 'Note Request',
  display: {
    label: 'Add Note to Request',
    description: 'Add Note to Request.',
  },
  operation: {
    inputFields: [
      { key: 'id', label: 'Request ID', required: true },
      { key: 'note', label: 'Note', required: true },
    ],
    perform: noteRequest,
    sample,
  },
};
