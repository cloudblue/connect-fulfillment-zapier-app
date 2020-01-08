/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const inquireRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const params = [];
  _.forEach(bundle.inputData.params, (value, key) => {
    params.push({
      id: key,
      value_error: value,
    });
  });
  await ff.inquireTierConfigRequest(
    bundle.inputData.request_id,
    params,
    bundle.inputData.notes,
  );
  return Promise.resolve({});
};

module.exports = {
  key: 'inquire_tier_config_request',
  noun: 'Tier Config Request',
  display: {
    label: 'Inquire a Tier Config Request',
    description: 'Request changes to request technical contact relative to ordering parameters and set request to inquire status (without line items support).',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'note', label: 'Note' },
      { key: 'template_id', label: 'Template ID' },
      {
        key: 'params',
        dict: true,
        required: true,
        label: 'Parameters',
        helpText: 'Enter a list of Parameter ID, Error Text',
      },
    ],
    perform: inquireRequest,
    sample,
  },
};
