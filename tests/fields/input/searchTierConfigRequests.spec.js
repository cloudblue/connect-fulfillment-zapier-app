/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../lib/fields/input/search_tier_config_requests');

describe('search tier config requests', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'configuration_account_id',
          'assignee_id'
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    console.log(fields);
    expect(fields).toEqual([
      { 
        key: 'configuration_account_id',
        required: false,
        label: 'Tier Account ID',
        list: true,
      },
      { 
        key: 'assignee_id',
        required: false,
        label: 'Assignee ID',
        dynamic: 'account_users.id.name',
      } 
    ]);
  });
});