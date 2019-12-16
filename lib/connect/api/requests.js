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
    assetProductId: bundle.inputData.product_id,
    assetProductName: bundle.inputData.product_name,
    assetConnectionHubId: bundle.inputData.hub_id,
    assetConnectionHubName: bundle.inputData.hub_name,
    assetConnectionProviderId: bundle.inputData.provider_id,
    assetConnectionProviderName: bundle.inputData.provider_name,
    assetConnectionVendorId: bundle.inputData.vendor_id,
    assetConnectionVendorName: bundle.inputData.vendor_name,
    assetTiersCustomerId: bundle.inputData.customer_id,
    assetTiersTier1Id: bundle.inputData.t1_id,
    assetTiersTier2Id: bundle.inputData.t2_id,
  });
  return Promise.resolve(response);
};

module.exports = { listRequests };
