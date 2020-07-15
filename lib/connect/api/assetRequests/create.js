/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');

const {
  sanitizeItems,
  getProductIdFromItems,
} = require('../helpers/data');

const {
  lookupConnectionByProductHub,
  lookupAssetByProductIdExternalId,
} = require('../helpers/lookups');

const {
  buildPurchaseRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
  buildParamsFromForm,
} = require('../helpers/builder');


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


const createAssetPurchaseRequest = async (client, inputData) => {
  let req = {};
  const data = _.cloneDeep(inputData);
  const productId = getProductIdFromItems(inputData.items);
  const connectionId = await lookupConnectionByProductHub(client, productId, inputData.hub_id);
  if (!connectionId) {
    throw new Error(`No connection found for product ${productId} and hub ${inputData.hub_id}`);
  }
  if (data.params_input_mode && data.params_input_mode === 'form') {
    data.params = await buildParamsFromForm(client, data, productId);
  }
  req = buildPurchaseRequest(data);
  req.asset.connection.id = connectionId;

  const ff = new Fulfillment(client);
  const response = await ff.createRequest(req);
  return Promise.resolve(response);
};

const createAssetChangeRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const response = await ff.createRequest(buildChangeRequest(data));
  return Promise.resolve(response);
};

const createAssetSuspendResumeCancelRequest = async (client, data, type) => {
  const ff = new Fulfillment(client);
  const response = await ff.createRequest(buildSuspendResumeCancelRequest(data, type));
  return Promise.resolve(response);
};

const createAssetSuspendRequest = async (client, data) => createAssetSuspendResumeCancelRequest(client, data, 'suspend');
const createAssetResumeRequest = async (client, data) => createAssetSuspendResumeCancelRequest(client, data, 'resume');
const createAssetCancelRequest = async (client, data) => createAssetSuspendResumeCancelRequest(client, data, 'cancel');


const createRequestForProduct = async (client, inputData, productId, assetExteralId, itemsInfo) => {
  const assets = await lookupAssetByProductIdExternalId(
    client, productId, assetExteralId,
  );
  const data = _.cloneDeep(inputData);
  data.items = _.clone(itemsInfo.items);
  if (assets.length === 0) {
    if (data.params_input_mode && data.params_input_mode === 'form') {
      data.params = await buildParamsFromForm(client, data, productId);
    }
    const req = buildPurchaseRequest(data);
    const connectionId = await lookupConnectionByProductHub(client, productId, data.hub_id);
    if (!connectionId) {
      // if no connection exists for product/hub skip request
      return Promise.resolve({
        product_id: productId,
        request: req,
        skipped: true,
        reason: `No connection found for product ${productId} and hub ${data.hub_id}`,
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

const createAssetRequestFromOrder = async (client, data) => {
  const groupedItems = groupItemsByProduct(sanitizeItems(data.items));
  // console.log(inspect(groupedItems, false, null, true));
  const productIds = _.keys(groupedItems);
  const promises = [];
  _.each(productIds, (productId) => {
    const promise = createRequestForProduct(client, data, productId,
      data.asset_external_id, groupedItems[productId]);
    promises.push(promise);
  });
  const requestsByProduct = await Promise.all(promises);
  const ff = new Fulfillment(client);


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
          asset_external_id: data.asset_external_id,
          request_type: reqByProduct.request.type,
          reason: reqByProduct.reason,
        });
      });
      continue;
    }
    try {
      /* eslint-disable-next-line no-await-in-loop */
      const resp = await ff.createRequest(reqByProduct.request);
      _.each(reqByProduct.request.asset.items, (item) => {
        response.succeeded.push({
          item_id: item.id,
          quantity: item.quantity,
          product_id: reqByProduct.product_id,
          request_id: resp.id,
          asset_id: resp.asset.id,
          asset_external_id: data.asset_external_id,
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
          asset_external_id: data.asset_external_id,
          request_type: reqByProduct.request.type,
          reason: e.message,
        });
      });
    }
  }
  return Promise.resolve(response);
};

module.exports = {
  createAssetPurchaseRequest,
  createAssetChangeRequest,
  createAssetSuspendRequest,
  createAssetResumeRequest,
  createAssetCancelRequest,
  createAssetRequestFromOrder,
};
