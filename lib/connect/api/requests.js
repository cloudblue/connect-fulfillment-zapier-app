/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');

const { sanitizeItems, filtersToQuery } = require('./helpers/data');

const {
  lookupConnectionByProductHub,
  lookupAssetByProductIdExternalId,
} = require('./helpers/lookups');

const { getConnectClient } = require('../http');

const {
  buildPurchaseRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
} = require('./helpers/builder');


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


const needCancelation = (asset, order) => _.every(_.values(_.merge(asset, order)), (q) => q === 0);

const listRequests = async (z, bundle, orderBy) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const limit = bundle.inputData.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(bundle.inputData, FILTERS_MAP);
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


const createAssetPurchaseRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  let req = {};
  const data = _.cloneDeep(bundle.inputData);
  const item = bundle.inputData.items[0];
  const productId = item.item_id.substr(0, 15);
  const connectionId = await lookupConnectionByProductHub(
    client, productId, bundle.inputData.hub_id,
  );
  if (!connectionId) {
    throw new Error(`No connection found for product ${productId} and hub ${bundle.inputData.hub_id}`);
  }
  req = buildPurchaseRequest(data);
  req.asset.connection.id = connectionId;

  const ff = new Fulfillment(client);
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


const createRequestForProduct = async (z, bundle, productId, assetExteralId, itemsInfo) => {
  const client = getConnectClient(z, bundle);
  const assets = await lookupAssetByProductIdExternalId(
    client, productId, assetExteralId,
  );
  const data = _.cloneDeep(bundle.inputData);
  data.items = _.clone(itemsInfo.items);
  if (assets.length === 0) {
    const req = buildPurchaseRequest(data);
    const connectionId = await lookupConnectionByProductHub(client, productId, data.hub_id);
    if (!connectionId) {
      // if no connection exists for product/hub skip request
      return Promise.resolve({
        product_id: productId,
        request: req,
        skipped: true,
        reason: `No connection found for product ${productId} and hub ${bundle.inputData.hub_id}`,
      });
    }
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
    succeeded: [],
    skipped: [],
    failed: [],
  };

  /* eslint-disable no-restricted-syntax, no-continue */
  for (const reqByProduct of requestsByProduct) {
    if (reqByProduct.skipped) {
      _.each(reqByProduct.request.asset.items, (item) => {
        response.skipped.push({
          item_id: item.id,
          quantity: item.quantity,
          product_id: reqByProduct.product_id,
          asset_external_id: bundle.inputData.asset_external_id,
          request_type: reqByProduct.request.type,
          reason: reqByProduct.reason,
        });
      });
      continue;
    }
    try {
      const resp = await ff.createRequest(reqByProduct.request);
      _.each(reqByProduct.request.asset.items, (item) => {
        response.succeeded.push({
          item_id: item.id,
          quantity: item.quantity,
          product_id: reqByProduct.product_id,
          request_id: resp.id,
          asset_id: resp.asset.id,
          asset_external_id: bundle.inputData.asset_external_id,
          asset_external_uid: resp.asset.external_uid,
          request_type: reqByProduct.request.type,
        });
      });
    } catch (e) {
      _.each(reqByProduct.request.asset.items, (item) => {
        response.failed.push({
          item_id: item.id,
          quantity: item.quantity,
          asset_id: reqByProduct.request.asset.id,
          product_id: reqByProduct.product_id,
          asset_external_id: bundle.inputData.asset_external_id,
          request_type: reqByProduct.request.type,
          reason: e.message,
        });
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
