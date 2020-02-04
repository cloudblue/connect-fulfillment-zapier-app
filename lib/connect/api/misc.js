/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const { Inventory } = require('@cloudblueconnect/connect-javascript-sdk');

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
};
