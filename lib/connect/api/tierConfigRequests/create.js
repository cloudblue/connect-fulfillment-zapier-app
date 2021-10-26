/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { paramDictToArray, processStructuredParams } = require('../helpers/data');

const createUpdateTierConfigRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const params = processStructuredParams(
    Array.isArray(data.params) ? data.params : paramDictToArray(data.params),
  );
  const response = await ff.createUpdateTierConfigRequest(
    data.config_id,
    params,
  );
  return Promise.resolve(response);
};

module.exports = {
  createUpdateTierConfigRequest,
};
