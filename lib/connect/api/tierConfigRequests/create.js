/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { paramDictToArray } = require('../helpers/data');

const createUpdateTierConfigRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const params = Array.isArray(data.params) ? data.params : paramDictToArray(data.params);
  const response = await ff.createUpdateTierConfigRequest(
    data.config_id,
    params,
  );
  return Promise.resolve(response);
};

module.exports = {
  createUpdateTierConfigRequest,
};
