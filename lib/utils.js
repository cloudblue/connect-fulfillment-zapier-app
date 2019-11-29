const connect = require('connect-javascript-sdk'),
    ConnectClient = connect.ConnectClient,
    AbstractHttpAdapter = connect.AbstractHttpAdapter;

class Response {
    constructor(response) {
        this._response = response;
    }
    get ok() {
        return this._response.status >= 200 && this._response.status < 300;
    }
    get status() {
        return this._response.status;
    }
    async json() {
        return Promise.resolve(this._response.json);
    }
    async text() {
        return Promise.resolve(this._response.content);
    }
}

class ZapierHttpAdapter extends AbstractHttpAdapter {
    prepareRequest(url, options) {
        return {url: url, options: options};
    }
    parseResponse(response) {
        return new Response(response);
    }
}

let client = null;

const getConnectClient = (z, bundle) => {
    if (!client) {
        client = new ConnectClient(
            bundle.authData.endpoint,
            bundle.authData.api_key,
            new ZapierHttpAdapter(z.request));
    }
    return client;
};

module.exports = {
    getConnectClient: getConnectClient
};