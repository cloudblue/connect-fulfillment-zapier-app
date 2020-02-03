/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../lib/fields/input/new_asset_requests_from_order');

const { FIELDS_TIER_2 } = require('../../../lib/fields/input/tiers');

describe('new asset requests from order', () => {
  it('tier2Fields returns expected fields if reseller_tiers === t2t1', async () => {
    const bundle = {
      inputData: {
        reseller_tiers: 't2t1'
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual(FIELDS_TIER_2);
  });
  it('tier2Fields returns empty array if reseller_tiers !== t2t1', async () => {
    const bundle = {
      inputData: {
        reseller_tiers: 'xxx'
      }
    };
    const fn = _.filter(PURCHASE_FIELDS, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([]);
  });
});