/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { paramDictToArray, processStructuredParams } = require('../helpers/data');
const { getProductIdByTierConfigurationId } = require('../misc');
const { buildParamsFromForm } = require('../helpers/builder');

const createUpdateTierConfigRequest = async (client, data) => {
  const ff = new Fulfillment(client);
  const productId = await getProductIdByTierConfigurationId(client, data.config_id);
  let params;
  if (data.params_input_mode && data.params_input_mode === 'form') {
    params = await buildParamsFromForm(client, data, productId);
  } else {
    params = processStructuredParams(
      Array.isArray(data.params) ? data.params : paramDictToArray(data.params),
    );
  }
  const response = await ff.createUpdateTierConfigRequest(
    data.config_id,
    params,
  );
  return Promise.resolve(response);
};

module.exports = {
  createUpdateTierConfigRequest,
};
