/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const getConnectClient = require('./utils').getConnectClient;

const testAuth = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.accounts.list();
    const account = response[0];
    return Promise.resolve({account_info: `${account.name} (${account.id})`});
};

const authentication = {
    type: 'custom',
    test: testAuth,
    connectionLabel: '{{account_info}}',
    fields: [
        {
            key: 'endpoint',
            type: 'string',
            required: true,
            helpText: 'Please go to the [Connect Knowledge Base](http://help.provider.connect.cloud.im/support/home) to get help.'
        },
        {
            key: 'api_key',
            type: 'string',
            required: true,
            helpText: 'Please go to the [Connect Knowledge Base](http://help.provider.connect.cloud.im/support/home) to get help.'
        }
    ]
};


module.exports = {
    authentication: authentication
}