const ConnectClient = require('connect-javascript-sdk');

const getConnectClient = (z, bundle) => {
    return new ConnectClient(
        bundle.authData.endpoint,
        bundle.authData.api_key,
        z.request);
};

module.exports = {
    getConnectClient: getConnectClient
};