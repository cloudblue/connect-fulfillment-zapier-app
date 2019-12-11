/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const approveRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.requests.approveWithTemplate(
    bundle.inputData.id,
    bundle.inputData.template_id,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'approve_request',
  noun: 'Approve Request',
  display: {
    label: 'Approve Request',
    description: 'Approve a Request.',
  },
  operation: {
    inputFields: [
      { key: 'id', label: 'Request ID', required: true },
      { key: 'template_id', label: 'Template ID', required: true },
    ],
    perform: approveRequest,
    sample,
  },
};
