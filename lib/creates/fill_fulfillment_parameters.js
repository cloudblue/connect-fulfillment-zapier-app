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
  key: 'fill_fulfillment_params',
  noun: 'Fulfillment Parameter',
  display: {
    label: 'Fill Asset Request Fulfillment Parameters',
    description: 'Vendors can use this action to populate values for '
    + 'Fulfillment parameters on Asset requests that are in pending status, '
    + 'the values can come from previous steps.',
  },
  operation: {
    inputFields: [
      {
        key: 'request_id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Provide the list of parameters to set value, first field is to specify the '
          + 'parameter id as seen on CloudBlue Connect portals, the second field is to provide '
          + 'it\'s value. Please note that both can be populated from previous steps in the Zap.',
      },
    ],
    perform: updateRequestParameters,
    sample,
  },
};
