/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetCancelRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const { SUSPEND_RESUME_CANCEL_FIELDS } = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_cancel_request',
  noun: 'Asset Cancel Request',
  display: {
    label: 'Create Asset Cancel Request',
    description: 'Providers can create cancel requests using this action, in order to cancel an asset.',
  },
  operation: {
    inputFields: SUSPEND_RESUME_CANCEL_FIELDS,
    perform: createAssetCancelRequest,
    sample,
  },
};
