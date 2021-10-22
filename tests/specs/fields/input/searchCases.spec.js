/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_cases');

describe('search cases', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },      
      inputData: {
        filters: [
          'status',
          'priority',
          'filter_that_does_not_exists',
        ]
      },
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      { 
        key: 'state',
        required: false,
        label: 'Case Status',
        helpText: 'Using this filter only cases matching the requested status will be available for the Zap.',
        list: false,
        choices: {
                'closed':'Closed',
                'inquiring':'Inquiring',
                'pending':'Pending',
                'resolved':'Resolved',
        }
      },
      { 
        key: 'priority',
        label: 'Using this filter only cases matching the requested Priority will be available for the Zap.',
        list: false ,
        choices: {
          '0': 'Low',
          '1': 'medium',
          '2': 'High',
          '3': 'Urgent',
        }
      } 
    ]);
  });
});