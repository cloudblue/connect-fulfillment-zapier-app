/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');

const { Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery } = require('./helpers/data');

const ASSETS_FILTERS_MAP = {
  status: 'status',
  billing_period_uom: 'billing.period.uom',
  external_id: 'external_id',
  external_uid: 'external_uid',
  product_id: 'product.id',
  product_name: 'product.name',
  connection_id: 'connection.id',
  provider_id: 'connection.provider.id',
  provider_name: 'connection.provider.name',
  vendor_id: 'connection.vendor.id',
  vendor_name: 'connection.vendor.name',
  hub_id: 'connection.hub.id',
  hub_name: 'connection.hub.name',
  marketplace_id: 'marketplace.id',
  marketplace_name: 'marketplace.name',
  customer_id: 'tiers.customer.id',
  t1_id: 'tiers.tier1.id',
  t2_id: 'tiers.tier2.id',
};

const listRecurringAssets = async (client, data, orderBy) => {
  const sub = new Subscriptions(client);
  const limit = 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, ASSETS_FILTERS_MAP);
    if (data.created_before || data.created_after) {
      queryParams['events.created.at'] = {};
    }
    if (data.updated_before || data.updated_after) {
      queryParams['events.updated.at'] = {};
    }
    if (data.billing_next_date_before || data.billing_next_date_after) {
      queryParams['billing.next_date'] = {};
    }
    if (data.created_before) {
      queryParams['events.created.at'].$le = moment(data.created_before).toISOString();
    }
    if (data.created_after) {
      queryParams['events.created.at'].$ge = moment(data.created_after).toISOString();
    }
    if (data.updated_before) {
      queryParams['events.updated.at'].$le = moment(data.updated_before).toISOString();
    }
    if (data.updated_after) {
      queryParams['events.updated.at'].$ge = moment(data.updated_after).toISOString();
    }
    if (data.billing_next_date_before) {
      queryParams['billing.next_date'].$le = moment(data.billing_next_date_before).toISOString();
    }
    if (data.billing_next_date_after) {
      queryParams['billing.next_date'].$ge = moment(data.billing_next_date_after).toISOString();
    }
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.$ordering = orderBy;
    response = await sub.searchRecurringAssets(queryParams);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);
  return Promise.resolve(results);
};

module.exports = {
  listRecurringAssets,
};
