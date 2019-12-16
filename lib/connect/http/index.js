/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
const { ConnectClient } = require('@cloudblueconnect/connect-javascript-sdk');
const ZapierHttpAdapter = require('./adapter');


const getConnectClient = (z, bundle) => new ConnectClient(
  bundle.authData.endpoint,
  bundle.authData.api_key,
  new ZapierHttpAdapter(z.request),
);

module.exports = { getConnectClient };
