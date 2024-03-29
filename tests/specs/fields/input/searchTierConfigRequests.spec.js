/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_tier_config_requests');

describe('search tier config requests', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'configuration_account_id',
          'assignee_id',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
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