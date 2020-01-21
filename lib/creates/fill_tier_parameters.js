/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const _ = require('lodash');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const updateRequestParameters = async (z, bundle) => {
  const params = [];
  _.forEach(bundle.inputData.params, (value, key) => {
    params.push({
      id: key,
      value,
    });
  });
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.updateTierConfigRequestParameters(
    bundle.inputData.request_id,
    params,
    bundle.inputData.notes,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'fill_tier_params',
  noun: 'Tier Config Parameter',
  display: {
    label: 'Fill Tier Config Request Parameters',
    description: 'Vendors can use this action to populate values for '
      + 'Fulfillment parameters on Tier Config Requests knowing the list '
      + 'of parameters they want to populate, the values can come from previous steps.',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Value',
      },
      { key: 'notes', label: 'Notes' },
    ],
    perform: updateRequestParameters,
    sample,
  },
};
