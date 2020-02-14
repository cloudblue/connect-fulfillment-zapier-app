/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_requests');

describe('search asset requests', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'hub_name',
          'provider_id',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      { 
        key: 'hub_name',
        required: false,
        label: 'Hub Name',
        list: true
      },
      { 
        key: 'provider_id',
        required: false,
        label: 'Provider ID',
        list: true 
      } 
    ]);
  });
});