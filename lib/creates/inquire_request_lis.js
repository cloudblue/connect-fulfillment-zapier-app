/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/inquire_request');

const inquireRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.inquireRequestWithTemplate(
    bundle.inputData.request_id,
    bundle.inputData.template_id,
    bundle.inputData.params,
    bundle.inputData.note,
  );
  return Promise.resolve(response);
};

module.exports = {
  key: 'inquire_request_lis',
  noun: 'Request',
  display: {
    label: 'Inquire a Request (with line items support)',
    description: 'Request changes to request technical contact relative to ordering parameters and set request to inquire status (with line items support).',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'note', label: 'Note', required: true },
      { key: 'template_id', label: 'Template ID', required: true },
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
    perform: inquireRequest,
    sample,
  },
};