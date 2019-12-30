const should = require('should');

const ifields = require('../../../lib/fields/input/search_tier_config_requests');

describe('Connect Fulfillment Zapier App - Search Tier Config Request Fields', () => {
  it('return filters fields for id, configuration_id, product_id', async () => {
    const f = ifields.slice(-1).pop();
    const bundle = {
      authData: {
        account_type: 'provider'
      },
      inputData: {
        filters: ['id', 'configuration_id', 'configuration_product_id']
      }
    };
    const results = await f(null, bundle);
    results.should.be.an.Array();
    results.should.have.size(3);
  });
  it('return filters fields for id, configuration_id, product_id excluding null', async () => {
    const f = ifields.slice(-1).pop();
    const bundle = {
      authData: {
        account_type: 'provider'
      },
      inputData: {
        filters: ['id', 'configuration_id', 'configuration_product_id', null]
      }
    };
    const results = await f(null, bundle);
    results.should.be.an.Array();
    results.should.have.size(3);
  });
});