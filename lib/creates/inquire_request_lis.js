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

  let response;
  if (bundle.inputData.template_id) {
    response = await ff.inquireRequestWithTemplate(
      bundle.inputData.request_id,
      bundle.inputData.template_id,
      bundle.inputData.params,
      bundle.inputData.note,
    );
  } else {
    response = await ff.inquireRequest(
      bundle.inputData.request_id,
      {},
      bundle.inputData.params,
      bundle.inputData.note,
    );
  }
  return Promise.resolve(response);
};

module.exports = {
  key: 'inquire_request_lis',
  noun: 'Asset Request',
  display: {
    label: 'Inquire Asset Request (with line items support)',
    description: 'Vendors can use this action to inquire a pending request for parameters defined on previews steps of the zap, '
      + 'useful when interacting with Vendor API and API can set multiple fields that requires refinement.',
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
    perform: inquireRequest,
    sample,
  },
};
