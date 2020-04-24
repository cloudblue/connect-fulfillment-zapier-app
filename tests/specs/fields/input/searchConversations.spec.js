/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_conversations');

describe('search conversations', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'id',
          'instance_id',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      { 
        key: 'id',
        label: 'Conversation ID',
        helpText: 'The unique conversation identifier.',
        placeholder: 'CO-000-000-000',
        list: false
      },
      { 
        key: 'instance_id',
        label: 'Instance ID',
        helpText: 'This ide can see the identifier of Asset, PR, Tier configuration.',
        placeholder: 'PR-4786-4908-0381-001',
        list: false 
      } 
    ]);
  });
});