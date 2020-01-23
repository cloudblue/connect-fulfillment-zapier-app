/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment, Directory } = require('@cloudblueconnect/connect-javascript-sdk');
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

const lookupConnectionByProductHub = async (z, bundle, productId, hubId) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  return ff.getConnectionIdByProductAndHub(productId, hubId);
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

const getTier = (data, t) => {
  const phone = parsePhoneNumber(data[`${t}_phone`], data[`${t}_country`]);
  return {
    name: data[`${t}_company_name`],
    external_id: data[`${t}_external_id`],
    external_uid: data[`${t}_external_uid`] || uuidv4(),
    contact_info: {
      address_line1: data[`${t}_address1`],
      address_line2: data[`${t}_address2`],
      postal_code: data[`${t}_postal_code`],
      city: data[`${t}_city`],
      state: data[`${t}_state`],
      country: data[`${t}_country`],
      contact: {
        phone_number: phone,
        first_name: data[`${t}_first_name`],
        last_name: data[`${t}_last_name`],
        email: data[`${t}_email`],
      },
    },
  };
};


const buildPurchaseRequest = (data) => {
  const req = {
    type: 'purchase',
    asset: {
      external_id: data.asset_external_id,
      external_uid: data.asset_external_uid || uuidv4(),
      connection: {
        id: data.connection_id,
      },
      items: sanitizeItems(data.items),
      params: paramDictToArray(data.params),
      tiers: {
        tier1: getTier(data, 't1'),
        customer: getTier(data, 'customer'),
      },
    },
  };
  if (data.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = getTier(data, 't2');
  }
  return req;
};

const buildChangeRequest = (data) => {
  const req = {
    type: 'change',
    asset: {
      id: data.asset_id,
      items: sanitizeItems(data.items),
    },
  };
  if (data.external_attributes) {
    req.asset.external_attributes = sanitizeParams(data.external_attributes);
  }
  return req;
};

const buildSuspendResumeCancelRequest = (data, type) => {
  const req = {
    type,
    asset: {
      id: data.asset_id,
    },
  };
  if (data.external_attributes) {
    req.asset.external_attributes = sanitizeParams(data.external_attributes);
  }
  return req;
};

const createAssetPurchaseRequest = async (z, bundle) => {
  let req = {};
  const data = _.cloneDeep(bundle.inputData);
  const item = bundle.inputData.items[0];
  const productId = item.item_id.substr(0, 15);
  const connectionId = await lookupConnectionByProductHub(
    z, bundle, productId, bundle.inputData.hub_id,
  );
  if (!connectionId) {
    throw new Error(`No connection found for product ${productId} and hub ${bundle.inputData.hub_id}`);
  }
  req = buildPurchaseRequest(data);
  req.asset.connection.id = connectionId;

  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(req);
  return Promise.resolve(response);
};

const createAssetChangeRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(buildChangeRequest(bundle.inputData));
  return Promise.resolve(response);
};

const createAssetSuspendResumeCancelRequest = async (z, bundle, type) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(buildSuspendResumeCancelRequest(bundle.inputData, type));
  return Promise.resolve(response);
};

const createAssetSuspendRequest = async (z, bundle) => createAssetSuspendResumeCancelRequest(z, bundle, 'suspend');
const createAssetResumeRequest = async (z, bundle) => createAssetSuspendResumeCancelRequest(z, bundle, 'resume');
const createAssetCancelRequest = async (z, bundle) => createAssetSuspendResumeCancelRequest(z, bundle, 'cancel');

const groupItemsByProduct = (items) => {
  const results = {};
  _.each(items, (item) => {
    const productId = item.id.substr(0, 15);
    if (!_.has(results, productId)) {
      results[productId] = {
        items: [],
        itemsMap: {},
      };
    }
    results[productId].itemsMap[item.id] = item.quantity;
    results[productId].items.push(item);
  });
  return results;
};

const itemsToObject = (items) => {
  const results = {};
  _.each(items, (item) => {
    results[item.id] = item.quantity;
  });
  return results;
};

const lookupAssetByProductIdExternalId = async (z, bundle, productId, assetExternalId) => {
  const client = getConnectClient(z, bundle);
  const directory = new Directory(client);
  return directory.getAssetsByProductIdExternalId(productId, assetExternalId);
};


const needCancelation = (asset, order) => _.every(_.values(_.merge(asset, order)), (q) => q === 0);

const createRequestForProduct = async (z, bundle, productId, assetExteralId, itemsInfo) => {
  const assets = await lookupAssetByProductIdExternalId(
    z, bundle, productId, assetExteralId,
  );
  const data = _.cloneDeep(bundle.inputData);
  data.items = _.clone(itemsInfo.items);
  if (assets.length === 0) {
    const connectionId = await lookupConnectionByProductHub(z, bundle, productId, data.hub_id);
    if (!connectionId) {
      // if no connection exists for product/hub skip request
      return Promise.resolve({ product_id: productId, skipped: true });
    }
    const req = buildPurchaseRequest(data);
    req.asset.connection.id = connectionId;
    return Promise.resolve({ product_id: productId, request: req });
  }
  if (assets.length === 1) {
    data.asset_id = assets[0].id;
    if (needCancelation(itemsToObject(assets[0].items), itemsInfo.itemsMap)) {
      return Promise.resolve({ product_id: productId, request: buildSuspendResumeCancelRequest(data, 'cancel') });
    }
    return Promise.resolve({ product_id: productId, request: buildChangeRequest(data) });
  }
  throw new Error('text to be decided');
};

const createAssetRequestFromOrder = async (z, bundle) => {
  const groupedItems = groupItemsByProduct(sanitizeItems(bundle.inputData.items));
  // console.log(inspect(groupedItems, false, null, true));
  const productIds = _.keys(groupedItems);
  const promises = [];
  _.each(productIds, (productId) => {
    const promise = createRequestForProduct(z, bundle, productId,
      bundle.inputData.asset_external_id, groupedItems[productId]);
    promises.push(promise);
  });
  const requestsByProduct = await Promise.all(promises);
  const ff = new Fulfillment(getConnectClient(z, bundle));

  const response = {
    external_id: bundle.inputData.asset_external_id,
    requests: [],
    skipped: [],
  };
  /* eslint-disable no-restricted-syntax, no-continue */
  for (const reqByProduct of requestsByProduct) {
    if (reqByProduct.skipped) {
      response.skipped.push({
        product_id: reqByProduct.product_id,
        type: 'purchase',
        items: groupedItems[reqByProduct.product_id].items,
      });
      continue;
    }
    try {
      const resp = await ff.createRequest(reqByProduct.request);
      response.requests.push({
        product_id: reqByProduct.product_id,
        type: reqByProduct.request.type,
        items: groupedItems[reqByProduct.product_id].items,
        created: true,
        response: resp,
      });
    } catch (e) {
      response.requests.push({
        product_id: reqByProduct.product_id,
        type: reqByProduct.request.type,
        items: groupedItems[reqByProduct.product_id].items,
        created: false,
        response: e.message,
      });
    }
  }
  return Promise.resolve(response);
};

module.exports = {
  listRequests,
  createAssetPurchaseRequest,
  createAssetChangeRequest,
  createAssetSuspendRequest,
  createAssetResumeRequest,
  createAssetCancelRequest,
  createAssetRequestFromOrder,
};
