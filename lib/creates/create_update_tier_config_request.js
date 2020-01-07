/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const createUpdateTierConfigRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const params = [];
  _.forEach(bundle.inputData.params, (value, key) => {
    params.push({
      id: key,
      value,
    });
  });
  const response = await ff.createUpdateTierConfigRequest(
    bundle.inputData.config_id,
    params,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'create_update_tier_config_request',
  noun: 'Tier Config Request',
  display: {
    label: 'Create an Update Tier Config Request',
    description: 'Create a Tier Config Request of type "update" (without line items support).',
  },
  operation: {
    inputFields: [
      { key: 'config_id', label: 'Tier Configuration ID', required: true },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Value',
      },
    ],
    perform: createUpdateTierConfigRequest,
    sample,
  },
};
