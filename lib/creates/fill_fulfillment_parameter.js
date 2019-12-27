/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const _ = require('lodash');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const updateRequestParameters = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const params = [];
  _.forEach(bundle.inputData.params, (value, key) => {
    params.push({
      id: key,
      value,
    });
  });
  const response = await ff.updateRequestParameters(
    bundle.inputData.request_id,
    params,
    bundle.inputData.note,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'fill_fulfillment_param',
  noun: 'Fill fulfillment parameters',
  display: {
    label: 'Fill fulfillment parameters for Request',
    description: 'Fill fulfillment parameters for Request Asset (without line items support).',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
      },
      { key: 'note', label: 'Note' },
    ],
    perform: updateRequestParameters,
    sample,
  },
};
