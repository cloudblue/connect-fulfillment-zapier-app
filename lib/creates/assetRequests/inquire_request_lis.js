/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { inquireRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/inquire_request');


module.exports = {
  key: 'inquire_request_lis',
  noun: 'Asset Request',
  display: {
    label: 'Inquire Asset Request (With Line Items Support)',
    description: 'Vendors can use this action to inquire a request setting multiple parameters that needs changes, '
      + 'this action is useful when external systems can define the list of parameters to inquire for.',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'note', label: 'Note' },
      { key: 'template_id', label: 'Template ID' },
      {
        key: 'params',
        children: [
          {
            key: 'id',
            required: true,
            label: 'Parameter ID',
          },
          {
            key: 'value_error',
            required: true,
            label: 'Error Text',
          },
        ],
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return inquireRequest(client, bundle.inputData);
    },
    sample,
  },
};
