/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');

const { Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery } = require('../helpers/data');

const FILTERS_MAP = {
  id: 'id',
  type: 'type',
  period_uom: 'period.uom',
  asset_id: 'asset.id',
  asset_billing_period_uom: 'asset.billing.period.uom',
  asset_external_id: 'asset.external_id',
  asset_external_uid: 'asset.external_uid',
  asset_product_id: 'asset.product.id',
  asset_product_name: 'asset.product.name',
  asset_connection_id: 'asset.connection.id',
  asset_provider_id: 'asset.connection.provider.id',
  asset_provider_name: 'asset.connection.provider.name',
  asset_vendor_id: 'asset.connection.vendor.id',
  asset_vendor_name: 'asset.connection.vendor.name',
  asset_hub_id: 'asset.connection.hub.id',
  asset_hub_name: 'asset.connection.hub.name',
  asset_marketplace_id: 'asset.marketplace.id',
  asset_marketplace_name: 'asset.marketplace.name',
  asset_customer_id: 'asset.tiers.customer.id',
  asset_t1_id: 'asset.tiers.tier1.id',
  asset_t2_id: 'asset.tiers.tier2.id',
};

const listRequests = async (client, data, orderBy) => {
  const sub = new Subscriptions(client);
  const limit = data.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, FILTERS_MAP);
    if (data.created_before || data.created_after) {
      queryParams['events.created.at'] = {};
    }
    if (data.updated_before || data.updated_after) {
      queryParams['events.updated.at'] = {};
    }
    if (data.period_from_before || data.period_from_after) {
      queryParams['period.from'] = {};
    }
    if (data.period_to_before || data.period_to_after) {
      queryParams['period.to'] = {};
    }
    if (data.asset_billing_next_date_before || data.asset_billing_next_date_after) {
      queryParams['asset.billing.next_date'] = {};
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
    if (data.period_from_before) {
      queryParams['period.from'].$le = moment(data.period_from_before).toISOString();
    }
    if (data.period_from_after) {
      queryParams['period.from'].$ge = moment(data.period_from_after).toISOString();
    }
    if (data.period_to_before) {
      queryParams['period.to'].$le = moment(data.period_to_before).toISOString();
    }
    if (data.period_to_after) {
      queryParams['period.to'].$ge = moment(data.period_to_after).toISOString();
    }
    if (data.asset_billing_next_date_before) {
      queryParams['asset.billing.next_date'].$le = moment(data.asset_billing_next_date_before).toISOString();
    }
    if (data.asset_billing_next_date_after) {
      queryParams['asset.billing.next_date'].$ge = moment(data.asset_billing_next_date_after).toISOString();
    }
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.$ordering = orderBy;
    response = await sub.searchBillingRequests(queryParams);
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
