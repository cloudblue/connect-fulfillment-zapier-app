/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');

const { sanitizeItems, getProductIdFromItems } = require('../helpers/data');
const { getLogger } = require('../../../utils');

const {
  lookupConnectionByProductHub,
  lookupAssetByProductIdExternalId,
  getProductParameters,
} = require('../helpers/lookups');

const {
  buildPurchaseRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
} = require('../helpers/builder');

const logger = getLogger();

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

const buildParamsFromDict = (data) => {
  const params = [];
  _.each(data.params, (value, id) => {
    try {
      logger.debug('try to jsonparse', value);
      params.push({
        id,
        structured_value: JSON.parse(value),
      });
    } catch (e) {
      logger.debug('cannot jsonparse');
      params.push({ id, value });
    }
  });
  return params;
};

const buildParamsFromForm = (data, paramDefs) => {
  const params = [];
  _.each(paramDefs, (def) => {
    logger.debug(`processing param ${def.name} (${def.type})`);
    if (def.type === 'address') {
      params.push({
        id: def.name,
        structured_value: {
          address_line1: data[`${def.name}_address_line1`],
          address_line2: data[`${def.name}_address_line2`],
          city: data[`${def.name}_city`],
          state: data[`${def.name}_state`],
          postal_code: data[`${def.name}_postal_code`],
          country: data[`${def.name}_country`],
        },
      });
    } else if (def.type === 'phone') {
      params.push({
        id: def.name,
        structured_value: {
          country_code: data[`${def.name}_country_code`],
          area_code: data[`${def.name}_area_code`],
          phone_number: data[`${def.name}_phone_number`],
          extension: data[`${def.name}_extension`],
        },
      });
    } else if (def.type === 'checkbox') {
      const structuredValue = {};
      _.each(def.constraints.choices, (choice) => {
        structuredValue[choice.value] = data[def.name].includes(choice.value);
      });
      params.push({
        id: def.name,
        structured_value: structuredValue,
      });
    } else if (def.type === 'subdomain') {
      const subdomain = data[`${def.name}_subdomain`];
      const domain = data[`${def.name}_domain`];
      params.push({
        id: def.name,
        value: `${subdomain}.${domain}`,
      });
    } else {
      params.push({
        id: def.name,
        value: data[def.name],
      });
    }
  });
  return params;
};

const buildParams = async (client, data, productId) => {
  if (data.params_input_mode && data.params_input_mode === 'form') {
    logger.debug('build params for form mode');
    const paramDefs = await getProductParameters(client, productId, data.ordering_parameter_ids);
    logger.debug(`param definitions for ${productId}`, paramDefs);
    return buildParamsFromForm(data, paramDefs);
  }
  return buildParamsFromDict(data);
};


const createAssetPurchaseRequest = async (client, inputData) => {
  let req = {};
  const data = _.cloneDeep(inputData);
  const productId = getProductIdFromItems(inputData.items);
  const connectionId = await lookupConnectionByProductHub(client, productId, inputData.hub_id);
  if (!connectionId) {
    throw new Error(`No connection found for product ${productId} and hub ${inputData.hub_id}`);
  }
  const params = await buildParams(client, data, productId);
  logger.debug('Params are', params);
  req = buildPurchaseRequest(data, params);
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
    const params = await buildParams(client, data, productId);
    const req = buildPurchaseRequest(data, params);
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
