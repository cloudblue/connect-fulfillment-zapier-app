/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { inquireRequest } = require('../../connect/api/tierConfigRequests/actions');
const sample = require('../../samples/tier_config_request');


module.exports = {
  key: 'inquire_tier_config_request',
  noun: 'Tier Configuration Request',
  display: {
    label: 'Inquire a Tier Configuration Request',
    description: 'Vendors can use this action to inquire a pending Tier Config Request '
      + 'for parameters obtained on previous steps of the zap, like for example when interacting with '
      + 'Vendor API and API can define multiple fields that requires refinement.',
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
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return inquireRequest(client, bundle.inputData);
    },
    sample,
  },
};
