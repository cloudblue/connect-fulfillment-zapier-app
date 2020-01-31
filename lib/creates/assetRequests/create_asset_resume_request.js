/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createAssetResumeRequest } = require('../../connect/api/assetRequests/create');
const sample = require('../../samples/request');
const { SUSPEND_RESUME_CANCEL_FIELDS } = require('../../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_resume_request',
  noun: 'Asset Resume Request',
  display: {
    label: 'Create Asset Resume Request',
    description: 'Allows the creation of a single request of type "resume" on a existing asset in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: SUSPEND_RESUME_CANCEL_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      createAssetResumeRequest(client, bundle.inputData);
    },
    sample,
  },
};
