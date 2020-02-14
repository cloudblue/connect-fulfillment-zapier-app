/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment, Directory } = require('@cloudblueconnect/connect-javascript-sdk');

const lookupConnectionByProductHub = async (client, productId, hubId) => {
  const ff = new Fulfillment(client);
  return ff.getConnectionIdByProductAndHub(productId, hubId);
};

const lookupAssetByProductIdExternalId = async (client, productId, assetExternalId) => {
  const directory = new Directory(client);
  return directory.getAssetsByProductIdExternalId(productId, assetExternalId);
};

module.exports = {
  lookupAssetByProductIdExternalId,
  lookupConnectionByProductHub,
};
