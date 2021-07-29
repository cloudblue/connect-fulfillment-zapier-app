/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
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

const lookupTierByExternalId = async (client, tierExternalId, hubId) => {
  const tier = new Directory(client);
  const filter = {
    external_id: tierExternalId,
    'hub.id': hubId,
  };

  const results = await tier.searchTierAccounts(filter);
  if (results && results.length === 1) {
    const externalUid = results[0].external_uid;
    return externalUid;
  }
  return null;
};

module.exports = {
  lookupAssetByProductIdExternalId,
  lookupConnectionByProductHub,
  lookupTierByExternalId,
};
