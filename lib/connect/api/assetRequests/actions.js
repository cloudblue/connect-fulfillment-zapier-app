/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const {
  filtersToQuery,
  paramDictToArray,
  paramErrorDictToArray,
  processStructuredParams,
} = require('../helpers/data');


const FILTERS_MAP = {
  type: 'type',
  status: 'status',
  id: 'id',
  asset_id: 'asset.id',
  product_id: 'asset.product.id',
  product_name: 'asset.product.name',
  connection_type: 'asset.connection.type',
  hub_id: 'asset.connection.hub.id',
  hub_name: 'asset.connection.hub.name',
  provider_id: 'asset.connection.provider.id',
  provider_name: 'asset.connection.provider.name',
  vendor_id: 'asset.connection.vendor.id',
  vendor_name: 'asset.connection.vendor.name',
  customer_id: 'asset.tiers.customer.id',
  t1_id: 'asset.tiers.tier1.id',
  t2_id: 'asset.tiers.tier2.id',
  asset_param_id: 'asset.params.id',
  asset_param_value: 'asset.params.value',
};

const listRequests = async (client, data, orderBy) => {
  const ff = new Fulfillment(client);
  const limit = data.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, FILTERS_MAP);
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.$ordering = orderBy;
    response = await ff.searchRequests(queryParams);
    results = results.concat(response);
    offset += limit;
    if (data.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

const approveRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const response = await ff.approveRequestWithTemplate(
    data.id,
    data.template_id,
  );
  return Promise.resolve(response);
};

const updateRequestParameters = async (client, data) => {
  const ff = new Fulfillment(client);
  const params = processStructuredParams(
    Array.isArray(data.params) ? data.params : paramDictToArray(data.params),
  );
  const response = await ff.updateRequestParameters(
    data.request_id,
    params,
    data.note,
  );
  return Promise.resolve(response);
};

const inquireRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const params = Array.isArray(data.params) ? data.params : paramErrorDictToArray(data.params);
  let response;
  if (data.template_id) {
    response = await ff.inquireRequestWithTemplate(
      data.request_id,
      data.template_id,
      params,
      data.note,
    );
  } else {
    response = await ff.inquireRequest(
      data.request_id,
      {},
      params,
      data.note,
    );
  }
  return Promise.resolve(response);
};

const rejectRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const response = await ff.failRequest(
    data.request_id,
    data.reason,
  );
  return Promise.resolve(response);
};

module.exports = {
  listRequests,
  approveRequest,
  updateRequestParameters,
  inquireRequest,
  rejectRequest,
};
