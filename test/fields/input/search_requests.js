const should = require('should');

const ifields = require('../../../lib/fields/input/search_requests');

describe('Connect Fulfillment Zapier App - Search Request Fields', () => {
  it('....', async () => {
      const f = ifields.slice(-1).pop();
      const bundle = {
          authData: {
              account_type: 'provider'
          },
          inputData: {
              filters: ['id', 'hub_id', 'product_name']
          }
      };
      const results = await f(null, bundle);
      results.should.be.an.Array();
      results.should.have.size(3);
  });
});