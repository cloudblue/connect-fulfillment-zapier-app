const getConnectClient = require('./utils').getConnectClient;

const testAuth = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const url = `${bundle.authData.endpoint}/accounts`;
    const response = await client.accounts.list();
    if (response.status === 401) {
        throw new Error('The API key you supplied is invalid.')
    }
    const account = response.json[0];

    return new Promise((resolve, reject) => {
        resolve({
            account_info: `${account.name} (${account.id})`
        });
    });
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