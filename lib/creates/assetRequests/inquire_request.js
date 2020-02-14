/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


const { getConnectClient } = require('../../connect/http');
const { inquireRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/inquire_request');


module.exports = {
  key: 'inquire_request',
  noun: 'Asset Request',
  display: {
    label: 'Inquire Asset Request',
    description: 'Vendors can use this action to inquire a pending request knowing the concrete request parameters they want to inquire for.',
  },
  operation: {
    inputFields: [
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to set to inquire, this one can come from previous steps of the Zap or from a Search.',
      },
      { key: 'note', label: 'Note' },
      {
        key: 'template_id',
        label: 'Template ID',
        helpText: 'You may use an inquire template to use while inquiring. The templates can be seen on product editor under control panel section.',
      },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Error Text. The parameter ID is the one that will be set as require changes,'
          + ' the error text is a text to be displayed to the technical contact on the activation form.',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return inquireRequest(client, bundle.inputData);
    },
    sample,
  },
};
