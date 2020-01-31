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
    queryParams.order_by = orderBy;
    response = await ff.searchRequests(queryParams);
    results = results.concat(response);
    offset += limit;
    if (data.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};


module.exports = {
  listRequests,
};
