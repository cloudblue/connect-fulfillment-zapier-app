/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { getConnectClient } = require('../http');

const listRequests = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.requests.list({
    status: bundle.inputData.status,
    assetProductId: bundle.inputData.product,
  });
  return Promise.resolve(response);
};

module.exports = { listRequests };
