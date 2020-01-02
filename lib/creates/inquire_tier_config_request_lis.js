/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const inquireRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  await ff.inquireTierConfigRequest(
    bundle.inputData.request_id,
    bundle.inputData.params,
    bundle.inputData.notes,
  );
  return Promise.resolve({});
};

module.exports = {
  key: 'inquire_tier_config_request_lis',
  noun: 'Tier Config Request',
  display: {
    label: 'Inquire a Tier Config Request (with line items support)',
    description: 'Request changes to tier config request technical contact relative to ordering parameters and set request to inquire status (with line items support).',
  },
  operation: {
    inputFields: [
      { key: 'request_id', label: 'Request ID', required: true },
      { key: 'notes', label: 'Notes' },
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
