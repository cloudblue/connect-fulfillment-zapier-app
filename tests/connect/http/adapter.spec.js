/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const ZapierHttpAdapter = require('../../../lib/connect/http/adapter');
const Response = require('../../../lib/connect/http/response');

describe('ZapierHttpAdapter', () => {
  it('prepareRequest returns an unmodified request', () => {
    const adapter = new ZapierHttpAdapter({request: null});
    const { url, options } = adapter.prepareRequest('http://localhost', {method: 'POST'});
    expect(url).toEqual('http://localhost');
    expect(options).toEqual({ method: 'POST' });
  });
  it('parseResponse returns an instance of Response', () => {
    const adapter = new ZapierHttpAdapter({request: null});
    const response = adapter.parseResponse({
        status: 200,
        content: 'Hello world',
        json: {
            text: 'Hello world'
        }
    });
    expect(response).toBeInstanceOf(Response);
  });
});