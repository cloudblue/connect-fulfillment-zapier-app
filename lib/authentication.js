/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const jwt = require('jsonwebtoken');
const { getConnectClient } = require('./connect/http');

const testAuth = async (z, bundle) => {
  let endpoint = 'https://api.connect.cloudblue.com/public/v1';
  let token = bundle.authData.auth_token.trim();
  let message = '';
  if (token.indexOf('@') > -1) {
    [token, endpoint] = token.split('@');
    if (endpoint.endsWith('/')) {
      endpoint = endpoint.slice(0, -1);
    }
    message = `[${endpoint}]`;
  }
  let apiKey = token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.CONNECT_JWT_SECRET);
    apiKey = `ApiKey ${decoded.id}:${decoded.key}`;
  } catch (e) {
    // Fallback to "old" ApiKey
    if (!apiKey.startsWith('ApiKey')) {
      apiKey = `ApiKey ${apiKey}`;
    }
  }


  /* eslint-disable no-param-reassign */
  bundle.authData.endpoint = endpoint;
  bundle.authData.auth_token = apiKey;
  const client = getConnectClient(z, bundle);
  try {
    const response = await client.accounts.search();
    const account = response[0];
    return Promise.resolve({
      account_info: `${account.name} (${account.id}) ${message}`.trim(),
      account_type: account.type,
      account_id: account.id,
      endpoint,
      actual_api_key: apiKey,
    });
  } catch (e) {
    throw new Error('Provided credentials are not valid, '
                    + 'please ensure that you are using the'
                    + ' ones obtaining at your account Connect portal.');
  }
};

const authentication = {
  type: 'session',
  test: testAuth,
  connectionLabel: '{{account_info}}',
  sessionConfig: {
    perform: testAuth,
  },
  fields: [
    {
      key: 'endpoint',
      type: 'string',
      required: false,
      computed: true,
    },
    {
      key: 'auth_token',
      type: 'password',
      required: true,
      helpText: 'Please go to the [Connect portal](https://connect.cloudblue.com) documentation to get additional help on how to obtain a token.',
    },
    {
      key: 'actual_api_key',
      required: false,
      computed: true,
    },
    {
      key: 'account_type',
      type: 'string',
      required: false,
      computed: true,
    },
    {
      key: 'account_id',
      type: 'string',
      required: false,
      computed: true,
    },
  ],
};


module.exports = {
  authentication,
};
