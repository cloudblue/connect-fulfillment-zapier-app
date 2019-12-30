/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { getConnectClient } = require('../http');

const prepareFilters = (bundle) => ({
  type: bundle.inputData.type,
  status: bundle.inputData.status,
  id: bundle.inputData.id,
  configurationId: bundle.inputData.configuration_id,
  configurationTierLevel: bundle.inputData.configuration_tier_level,
  configurationAccountId: bundle.inputData.configuration_account_id,
  configurationProductId: bundle.inputData.configuration_product_id,
  configurationAccountExternalUID: bundle.inputData.configuration_account_external_uid,
  assigneeId: bundle.inputData.assignee_id,
  unassigned: bundle.inputData.unassigned,
});

const listRequests = async (z, bundle, orderBy) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const limit = bundle.inputData.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    response = await ff.listTierConfigRequests(prepareFilters(bundle), orderBy, limit, offset);
    results = results.concat(response);
    offset += limit;
    if (bundle.inputData.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

module.exports = { listRequests };
