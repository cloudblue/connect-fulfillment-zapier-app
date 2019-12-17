/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { getConnectClient } = require('./connect/http');

const testAuth = async (z, bundle) => {
  let endpoint = 'https://api.connect.cloud.im/public/v1';
  let apiKey = bundle.authData.api_key;
  let message = '';
  if (apiKey.indexOf('@') > -1){
    const substr = apiKey.split('@');
    apiKey = substr[0];
    endpoint = substr[1];
    message = `[${substr[1]}]`;
  }

  bundle.authData.endpoint = endpoint;
  bundle.authData.api_key = apiKey;
  const client = getConnectClient(z, bundle);
  const response = await client.accounts.list();
  const account = response[0];
  return Promise.resolve({ 
    account_info: `${account.name} (${account.id}) ${message}`,
    account_type: account.type,
    endpoint: endpoint,
    actual_api_key:  apiKey
  });
};

const authentication = {
  type: 'session',
  test: testAuth,
  connectionLabel: '{{account_info}}',
  sessionConfig: {
    perform: testAuth
  },
  fields: [
    {
      key: 'endpoint',
      type: 'string',
      required: false,
      computed: true
    },
    {
      key: 'api_key',
      type: 'password',
      required: true,
      helpText: 'Please go to the [Connect Knowledge Base](http://help.provider.connect.cloud.im/support/home) to get help.',
    },
    {
      key: 'actual_api_key',
      required: false,
      computed: true
    },
    {
      key: 'account_type',
      type: 'string',
      required: false,
      computed: true,
    },
  ],
};


module.exports = {
  authentication,
};
