/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const { ConnectClient } = require('@cloudblueconnect/connect-javascript-sdk');
const ZapierHttpAdapter = require('./adapter');


const getConnectClient = (z, bundle) => {
  const client = new ConnectClient(
    bundle.authData.endpoint,
    bundle.authData.actual_api_key || bundle.authData.auth_token,
    new ZapierHttpAdapter(z.request),
  );
  client.addBeforeRequestHook((url, options) => ({
    url,
    options: _.merge({}, options, { merge: false }),
  }));
  return client;
};

module.exports = { getConnectClient };
