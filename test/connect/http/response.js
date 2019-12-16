const should = require('should');
const Response = require('../../../lib/connect/http/response');


describe('Connect Fulfillment Zapier App - Http Response', () => {
  it('wraps the zapier response object', async () => {
      const resp = {
          status: 200,
          content: 'Hello world',
          json: {
              text: 'Hello world'
          }
      };
      const response = new Response(resp);
      response.ok.should.be.true();
      response.status.should.be.eql(200);
      response.text().should.be.Promise();
      response.json().should.be.Promise();
      const content = await response.text();
      content.should.be.eql('Hello world');
      const data = await response.json();
      data.should.be.an.Object();
      data.should.be.eql({
        text: 'Hello world'
      });
  });
});