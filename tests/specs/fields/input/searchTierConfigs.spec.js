/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_tierConfigs');

describe('search tier configurations', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'account_id',
          'connection_type',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      { 
        key: 'account_id',
        required: false,
        label: 'Account ID',
        list: false,
      },
      { 
        key: 'connection_type',
        label: 'Connection Type',
        choices: {
          production: 'Production',
          test: 'Test',
          preview: 'Preview',
        },
        list: false,
      } 
    ]);
  });
});