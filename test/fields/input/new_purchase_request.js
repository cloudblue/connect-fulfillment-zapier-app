const should = require('should');
const _ = require('lodash');
const ifields = require('../../../lib/fields/input/new_purchase_request');

describe('Connect Fulfillment Zapier App - New Purchase Request fields', () => {
  it('returns titer 2 fields', async () => {
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        reseller_tiers: 't2t1'
      }
    };
    const results = await f(null, bundle);
    results.should.be.an.Array();
    results.should.not.be.empty();
  });
  it('returns an empty array', async () => {
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        reseller_tiers: 't1'
      }
    };
    const results = await f(null, bundle);
    results.should.be.an.Array();
    results.should.be.empty();
  });
});