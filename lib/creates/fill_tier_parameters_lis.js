/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const updateRequestParameters = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.updateTierConfigRequestParameters(
    bundle.inputData.request_id,
    bundle.inputData.params,
    bundle.inputData.notes,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'fill_tier_params_lis',
  noun: 'Tier Parameter',
  display: {
    label: 'Fill Tier Config Request Parameters (with line items support)',
    description: 'Vendors can use this action to populate values for Fulfillment '
      + 'parameters on Tier Config Requests, with the help of line items support is '
      + 'possible to populate them dynamically and populate the ones resulting from previous steps of the Zap.',
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
      { key: 'notes', label: 'Notes' },
    ],
    perform: updateRequestParameters,
    sample,
  },
};
