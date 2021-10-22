/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const { PURCHASE_FIELDS } = require('../../../../lib/fields/input/new_asset_request');

const { FIELDS_TIER_2 } = require('../../../../lib/fields/input/tiers');

describe('new asset requests', () => {
  it('tier2Fields returns expected fields if reseller_tiers === t2t1', async () => {
    const bundle = {
      inputData: {
        reseller_tiers: 't2t1'
      }
    };
    const fn = _.filter(PURCHASE_FIELDS, (item) => typeof item === 'function')[0];
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