/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createAssetChangeRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const { CHANGE_FIELDS } = require('../fields/input/new_asset_request');

module.exports = {
  key: 'create_asset_change_request',
  noun: 'Asset Change Request',
  display: {
    label: 'Create Asset Change Request',
    description: 'Allows the creation of a single request of type "change" on a existing asset in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: CHANGE_FIELDS,
    perform: createAssetChangeRequest,
    sample,
  },
};
