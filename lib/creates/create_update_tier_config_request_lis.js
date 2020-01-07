/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const createUpdateTierConfigRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createUpdateTierConfigRequest(
    bundle.inputData.config_id,
    bundle.inputData.params,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'create_update_tier_config_request_lis',
  noun: 'Tier Config Request',
  display: {
    label: 'Create an Update Tier Config Request (with line items support)',
    description: 'Create a Tier Config Request of type "update" (with line items support).',
  },
  operation: {
    inputFields: [
      { key: 'config_id', label: 'Tier Configuration ID', required: true },
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
    ],
    perform: createUpdateTierConfigRequest,
    sample,
  },
};
