/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const { Inventory, Directory } = require('@cloudblueconnect/connect-javascript-sdk');
const { filtersToQuery } = require('./helpers/data');

const ASSETS_FILTERS_MAP = {
  status: 'status',
  id: 'id',
  product_id: 'product.id',
  connection_id: 'connection.id',
  contract_id: 'contract.id',
  marketplace_id: 'marketplace.id',
  connection_type: 'connection.type',
  hub_id: 'connection.hub.id',
  provider_id: 'connection.provider.id',
  customer_id: 'tiers.customer.id',
  t1_id: 'tiers.tier1.id',
  t2_id: 'tiers.tier2.id',
};

const searchAssets = async (client, data) => {
  const directory = new Directory(client);
  const limit = 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, ASSETS_FILTERS_MAP);
    if (data.created_before || data.created_after) {
      queryParams.created = {};
    }
    if (data.updated_before || data.updated_after) {
      queryParams.updated = {};
    }
    if (data.created_before) {
      queryParams.created.$le = data.created_before;
    }
    if (data.created_after) {
      queryParams.created.$ge = data.created_after;
    }
    if (data.updated_before) {
      queryParams.updated.$le = data.updated_before;
    }
    if (data.updated_after) {
      queryParams.updated.$ge = data.updated_after;
    }
    queryParams.limit = limit;
    queryParams.offset = offset;
    response = await directory.searchAssets(queryParams);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);
  return Promise.resolve(results);
};


const listUsers = async (client, data) => {
  const users = await client.accounts.users(data.account_id).search({
    limit: 30,
    offset: 30 * data.page,
  });
  if (data.page === 0) {
    users.unshift({
      id: 'UNASSIGNED',
      name: '-- Unassigned --',
    });
  }
  return Promise.resolve(users);
};

const createMessage = async (client, data) => {
  const conversations = await client.conversations.getConversationsByObjectId(data.id);
  const response = await client.conversations.createMessage(
    conversations[0].id,
    data.text,
  );
  return Promise.resolve(response);
};

const getMessagesByObjectId = async (client, data) => {
  const conversations = await client.conversations.getConversationsByObjectId(data.id);
  const response = await client.conversations.get(conversations[0].id);
  return Promise.resolve(response.messages);
};

const getActivationTemplates = async (client) => {
  const inventory = new Inventory(client);
  const templates = await inventory.getProductAssetTemplates();
  return Promise.resolve(templates);
};

const getAssetParametersForFulfillmentByProduct = async (client, data) => {
  const inventory = new Inventory(client);
  const parameters = await inventory.getAssetParametersForFulfillmentByProduct(data.id);
  return Promise.resolve(parameters);
};

const listHubs = async (client) => {
  const hubs = await client.hubs.search();
  return Promise.resolve(hubs);
};

const listVisibleProducts = async (client) => {
  const products = await client.products.search();
  const filtered = _.filter(products, (product) => {
    if (_.has(product, 'stats.agreements.distribution') && product.stats.agreements.distribution >= 1) {
      return true;
    }
    if (product.visibility && (
      product.visibility.listing === true
      || product.visibility.syndication === true
      || product.visibility.owner === true)) {
      return true;
    }
    return false;
  });
  return Promise.resolve(_.uniqBy(filtered, (o) => o.id));
};

module.exports = {
  listUsers,
  createMessage,
  getActivationTemplates,
  getAssetParametersForFulfillmentByProduct,
  listHubs,
  listVisibleProducts,
  getMessagesByObjectId,
  searchAssets,
};
