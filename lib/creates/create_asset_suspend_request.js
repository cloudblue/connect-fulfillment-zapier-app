/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetSuspendRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const { SUSPEND_RESUME_CANCEL_FIELDS } = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_suspend_request',
  noun: 'Asset Suspend Request',
  display: {
    label: 'Create Asset Suspend Request',
    description: 'Allows the creation of a single request of type "suspend" on a existing asset in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: SUSPEND_RESUME_CANCEL_FIELDS,
    perform: createAssetSuspendRequest,
    sample,
  },
};
