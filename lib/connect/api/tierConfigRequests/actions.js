/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery, paramDictToArray, paramErrorDictToArray } = require('../helpers/data');

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

const approveRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const response = await ff.approveTierConfigRequestWithTemplate(
    data.id,
    data.template_id,
  );
  return Promise.resolve(response);
};

const failRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  await ff.failTierConfigRequest(
    data.request_id,
    data.reason,
  );
  return Promise.resolve({});
};

const updateRequestParameters = async (client, data) => {
  const params = Array.isArray(data.params) ? data.params : paramDictToArray(data.params);
  const ff = new Fulfillment(client);
  const response = await ff.updateTierConfigRequestParameters(
    data.request_id,
    params,
    data.notes,
  );
  return Promise.resolve(response);
};

const inquireRequest = async (client, data) => {
  const params = Array.isArray(data.params) ? data.params : paramErrorDictToArray(data.params);
  const ff = new Fulfillment(client);
  await ff.inquireTierConfigRequest(
    data.request_id,
    params,
    data.notes,
  );
  return Promise.resolve({});
};

module.exports = {
  listRequests,
  approveRequest,
  failRequest,
  updateRequestParameters,
  inquireRequest,
};
