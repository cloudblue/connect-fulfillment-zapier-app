/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');

const { Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');

const { sanitizeItems } = require('../helpers/data');

const getAssetLookup = (data) => {
  if (data.asset_lookup_field === 'asset_id') {
    return {
      id: data.asset_lookup_value,
    };
  }
  return {
    external_uid: data.asset_lookup_value,
  };
};

const buildProviderBillingRequest = (data) => ({
  asset: getAssetLookup(data),
  type: 'provider',
  items: sanitizeItems(data.items),
  attributes: {
    provider: data.attributes,
  },
  period: {
    from: moment(data.period_from).toISOString(),
    to: moment(data.period_to).toISOString(),
    delta: data.period_delta,
    uom: data.period_uom,
  },
});


const buildVendorBillingRequest = (data) => ({
  asset: getAssetLookup(data),
  type: 'vendor',
  items: sanitizeItems(data.items),
  attributes: {
    vendor: data.attributes,
  },
  period: {
    from: moment(data.period_from).toISOString(),
    to: moment(data.period_to).toISOString(),
    delta: data.period_delta,
    uom: data.period_uom,
  },
});


const createBillingRequest = async (client, type, data) => {
  const sub = new Subscriptions(client);
  const request = type === 'provider' ? buildProviderBillingRequest(data) : buildVendorBillingRequest(data);
  const response = await sub.createBillingRequest(request);
  return Promise.resolve(response);
};

module.exports = {
  createBillingRequest,
};
