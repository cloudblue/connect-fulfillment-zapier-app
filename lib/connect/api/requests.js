/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');
// const { inspect } = require('util');
const uuidv4 = require('uuid/v4');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const { prepareFilters } = require('./utils');

const { getConnectClient } = require('../http');

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

const sanitizeIds = (items, idField) => {
  const sanitized = [];
  _.each(items, (item) => {
    sanitized.push(_.assign({ id: item[idField] }, _.pickBy(item, (v, k) => k !== idField)));
  });
  return sanitized;
};

const sanitizeItems = (items) => sanitizeIds(items, 'item_id');
const sanitizeParams = (items) => sanitizeIds(items, 'param_id');
const paramDictToArray = (params) => {
  const results = [];
  _.each(params, (value, id) => results.push({ id, value }));
  return results;
};

const lookupConnectionByProductHub = async (z, bundle) => {
  const item = bundle.inputData.items[0];
  const productId = item.item_id.substr(0, 15);
  const ff = new Fulfillment(getConnectClient(z, bundle));
  return ff.getConnectionIdByProductAndHub(productId, bundle.inputData.hub_id);
};

const listRequests = async (z, bundle, orderBy) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const limit = bundle.inputData.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = prepareFilters(bundle, FILTERS_MAP);
    queryParams.limit = limit;
    queryParams.offset = offset;
    queryParams.order_by = orderBy;
    response = await ff.searchRequests(queryParams);
    results = results.concat(response);
    offset += limit;
    if (bundle.inputData.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

const parsePhoneNumber = (number, country) => {
  try {
    let parsed;
    try {
      parsed = phoneUtil.parseAndKeepRawInput(number);
    } catch (e) {
      parsed = phoneUtil.parseAndKeepRawInput(number, country);
    }
    const countryCode = `+${parsed.getCountryCode()}`;
    const nationalSignificantNumber = phoneUtil.getNationalSignificantNumber(parsed);
    let areaCode = '';
    let subscriberNumber = nationalSignificantNumber;
    const areaCodeLength = phoneUtil.getLengthOfGeographicalAreaCode(parsed);
    if (areaCodeLength > 0) {
      areaCode = nationalSignificantNumber.substr(0, areaCodeLength);
      subscriberNumber = nationalSignificantNumber.substr(areaCodeLength);
    }
    return {
      country_code: countryCode,
      area_code: areaCode,
      phone_number: subscriberNumber,
      extension: parsed.getExtension() || '',
    };
  } catch (e) {
    return {};
  }
};

const getTier = (bundle, t) => {
  const phone = parsePhoneNumber(bundle.inputData[`${t}_phone`], bundle.inputData[`${t}_country`]);
  return {
    name: bundle.inputData[`${t}_company_name`],
    external_id: bundle.inputData[`${t}_external_id`],
    external_uid: bundle.inputData[`${t}_external_uid`] || uuidv4(),
    contact_info: {
      address_line1: bundle.inputData[`${t}_address1`],
      address_line2: bundle.inputData[`${t}_address2`],
      postal_code: bundle.inputData[`${t}_postal_code`],
      city: bundle.inputData[`${t}_city`],
      state: bundle.inputData[`${t}_state`],
      country: bundle.inputData[`${t}_country`],
      contact: {
        phone_number: phone,
        first_name: bundle.inputData[`${t}_first_name`],
        last_name: bundle.inputData[`${t}_last_name`],
        email: bundle.inputData[`${t}_email`],
      },
    },
  };
};


const buildPurchaseRequest = (z, bundle) => {
  const req = {
    type: 'purchase',
    asset: {
      external_id: bundle.inputData.asset_external_id,
      external_uid: bundle.inputData.asset_external_uid || uuidv4(),
      connection: {
        id: bundle.inputData.connection_id,
      },
      items: sanitizeItems(bundle.inputData.items),
      params: paramDictToArray(bundle.inputData.params),
      tiers: {
        tier1: getTier(bundle, 't1'),
        customer: getTier(bundle, 'customer'),
      },
    },
  };
  if (bundle.inputData.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = getTier(bundle, 't2');
  }
  return req;
};

const buildChangeRequest = (z, bundle) => {
  const req = {
    type: 'change',
    asset: {
      id: bundle.inputData.asset_id,
      items: sanitizeItems(bundle.inputData.items),
    },
  };
  if (bundle.inputData.external_attributes) {
    req.asset.external_attributes = sanitizeParams(bundle.inputData.external_attributes);
  }
  return req;
};

const buildCancelRequest = (z, bundle) => {
  const req = {
    type: 'cancel',
    asset: {
      id: bundle.inputData.asset_id,
    },
  };
  if (bundle.inputData.external_attributes) {
    req.asset.external_attributes = sanitizeParams(bundle.inputData.external_attributes);
  }
  return req;
};

// const createPurchaseRequest = async (z, bundle) => {
//   const req = buildPurchaseRequest(z, bundle);
//   const ff = new Fulfillment(getConnectClient(z, bundle));
//   const response = await ff.createRequest(req);
//   return Promise.resolve(response);
// };


const createAssetRequest = async (z, bundle) => {
  let req = {};
  if (bundle.inputData.request_type === 'purchase') {
    const connectionId = await lookupConnectionByProductHub(z, bundle);
    if (!connectionId) {
      // if no connection exists for product/hub skip request
      return Promise.resolve({});
    }
    req = buildPurchaseRequest(z, bundle);
    req.asset.connection.id = connectionId;
  } else if (bundle.inputData.request_type === 'change') {
    req = buildChangeRequest(z, bundle);
  } else if (bundle.inputData.request_type === 'cancel') {
    req = buildCancelRequest(z, bundle);
  }
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(req);
  return Promise.resolve(response);
};

module.exports = { listRequests, createAssetRequest };
