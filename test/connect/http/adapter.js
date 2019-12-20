const should = require('should');
const ZapierHttpAdapter = require('../../../lib/connect/http/adapter');
const Response = require('../../../lib/connect/http/response');


describe('Connect Fulfillment Zapier App - ZapierHttpAdapter', () => {
  it('prepareRequest returns an unmodified request', (done) => {
    const adapter = new ZapierHttpAdapter({request: null});
    const { url, options } = adapter.prepareRequest('http://localhost', {method: 'POST'});
    url.should.be.eql('http://localhost');
    options.should.be.an.Object();
    options.should.have.property('method').eql('POST');
    done();
  });
  it('parseResponse returns an instance of Response', (done) => {
    const adapter = new ZapierHttpAdapter({request: null});
    const response = adapter.parseResponse({
        status: 200,
        content: 'Hello world',
        json: {
            text: 'Hello world'
        }
    });
    response.should.be.an.Object();
    response.should.be.instanceOf(Response);
    done();
  });
});