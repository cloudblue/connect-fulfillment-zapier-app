/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery } = require('../helpers/data');

const FILTERS_MAP = {
  type: 'type',
  status: 'status',
  id: 'id',
  configuration_id: 'configuration__id',
  configuration_tier_level: 'configuration__tier_level',
  configuration_account_id: 'configuration__account__id',
  configuration_product_id: 'configuration__product__id',
  configuration_account_external_uid: 'configuration__account__external_uid',
  assignee_id: 'assignee__id',
  unassigned: 'unassigned',
};


const listRequests = async (client, inputData, orderBy) => {
  const ff = new Fulfillment(client);
  const limit = inputData.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const data = inputData;
    if (data.assignee_id === 'UNASSIGNED') {
      data.unassigned = true;
      delete data.assignee_id;
    }
    const queryParams = filtersToQuery(inputData, FILTERS_MAP);
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.order_by = orderBy;
    response = await ff.searchTierConfigRequests(queryParams);
    results = results.concat(response);
    offset += limit;
    if (inputData.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

module.exports = { listRequests };
