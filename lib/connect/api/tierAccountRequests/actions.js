/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Directory } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery } = require('../helpers/data');


const FILTERS_MAP = {
  status: 'status',
  id: 'id',
  product_id: 'product.id',
  product_name: 'product.name',
  provider_id: 'provider.id',
  provider_name: 'provider.name',
  vendor_id: 'vendor.id',
  vendor_name: 'vendor.name',
  account_id: 'account.id',
  account_name: 'account.name',
  account_external_id: 'account.external_id',
  account_external_uid: 'account.external_uid',
  account_evironment: 'account.environment',
  account_scopes: 'account.scopes',
  marketplace_id: 'account.marketplace.id',
  marketplace_name: 'account.marketplace.name',
  hub_id: 'account.hub.id',
  hub_name: 'account.hub.name',
};

const listRequests = async (client, data, orderBy) => {
  const dir = new Directory(client);
  const limit = data.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, FILTERS_MAP);
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.order_by = orderBy;
    response = await dir.searchTierAccountRequests(queryParams);
    results = results.concat(response);
    offset += limit;
    if (data.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

const acceptRequest = async (client, data) => {
  const dir = new Directory(client);
  const response = await dir.acceptTierAccountRequest(data.id);
  return Promise.resolve(response);
};

const ignoreRequest = async (client, data) => {
  const dir = new Directory(client);
  const response = await dir.ignoreTierAccountRequest(
    data.id,
    data.reason,
  );
  return Promise.resolve(response);
};

module.exports = {
  listRequests,
  acceptRequest,
  ignoreRequest,
};
