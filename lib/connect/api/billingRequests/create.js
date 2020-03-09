/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');

const { Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');

const { sanitizeItems } = require('../helpers/data');

const buildProviderBillingRequest = (data) => ({
  asset: {
    external_uid: data.asset_external_uid,
  },
  type: data.type,
  items: sanitizeItems(data.items),
  attributes: {
    provider: {
      external_id: data.provider_external_id,
    },
  },
  period: {
    from: moment(data.period_from).toISOString(),
    to: moment(data.period_to).toISOString(),
    delta: data.period_delta,
    uom: data.period_uom,
  },
});


const buildVendorBillingRequest = (data) => ({
  asset: {
    id: data.asset_id,
  },
  type: data.type,
  attributes: {
    vendor: {
      external_id: data.vendor_external_id,
    },
  },
});


const createBillingRequest = async (client, data) => {
  const sub = new Subscriptions(client);
  const request = data.type === 'provider' ? buildProviderBillingRequest(data) : buildVendorBillingRequest(data);
  const response = await sub.createBillingRequest(request);
  return Promise.resolve(response);
};

module.exports = {
  createBillingRequest,
};
