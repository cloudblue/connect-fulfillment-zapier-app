/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const updateRequestParameters = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.updateRequestParameters(
    bundle.inputData.request_id,
    bundle.inputData.params,
    bundle.inputData.note,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'fill_fulfillment_params_lis',
  noun: 'Fill fulfillment parameters',
  display: {
    label: 'Fill fulfillment parameters (with line items support)',
    description: 'Fill fulfillment parameters for Asset Request (with line items support).',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      {
        key: 'params',
        children: [
          {
            key: 'id',
            required: true,
            label: 'Parameter ID',
          },
          {
            key: 'value',
            required: true,
            label: 'Value',
          },
        ],
      },
      { key: 'note', label: 'Note' },
    ],
    perform: updateRequestParameters,
    sample,
  },
};
