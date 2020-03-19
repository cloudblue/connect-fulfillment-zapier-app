/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_recurring_assets');

describe('search recurring assets', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },
      inputData: {
        filters: [
          'billing_period_uom',
          'billing_next_date_before',
          'billing_next_date_after',
          'filter_that_does_not_exists',
        ]
      }
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      {
        key: 'billing_period_uom',
        label: 'Asset Billing Period UOM',
        list: true,
        choices: {
          monthly: 'Monthly',
          yearly: 'Yearly',
        },
      },
      {
        key: 'billing_next_date_before',
        type: 'datetime',
        required: false,
        label: 'Asset Billing Next Date before',
        helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
      },
      {
        key: 'billing_next_date_after',
        type: 'datetime',
        required: false,
        label: 'Asset Billing Next Date after',
        helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
      },
    ]);
  });
});