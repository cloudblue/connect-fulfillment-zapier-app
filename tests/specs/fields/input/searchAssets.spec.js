/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_assets');

describe('search assets', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'contract_id',
          'provider_id',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      { 
        key: 'contract_id',
        required: false,
        label: 'Contract ID',
        list: false
      },
      { 
        key: 'provider_id',
        required: false,
        label: 'Provider ID',
        list: false 
      } 
    ]);
  });
});