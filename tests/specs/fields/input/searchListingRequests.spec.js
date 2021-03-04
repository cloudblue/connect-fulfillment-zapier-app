/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const inputFields = require('../../../../lib/fields/input/search_listing_request');

describe('search listing request', () => {
  it('getFilterFields returns selected fields', async () => {
    const bundle = {
      authData: {
        account_type: 'vendor',
      },      
      inputData: {
        filters: [
          'marketplace_id',
          'marketplace_name',
          'product_id',
          'product_name',
          'provider_id',
          'vendor_id',
          'vendor_name',
          'contract_id',
          'contract_name',
          'status',
          'type',
          'filter_that_does_not_exists',
        ]
      },
    };
    const fn = _.filter(inputFields, (item) => typeof item === 'function')[0];
    const fields = await fn(null, bundle);
    expect(fields).toEqual([
      {
        key: 'marketplace_id',
        label: 'Marketplace ID',
        list: false,
      },
      {
        key: 'marketplace_name',
        label: 'Marketplace Name',
        list: false,
      },
      {
        key: 'product_id',
        required: false,
        label: 'Product ID',
        list: false,
      },
      {
        key: 'product_name',
        required: false,
        label: 'Product Name',
        list: false,
      },
      {
        key: 'provider_id',
        required: false,
        label: 'Provider ID',
        list: false,
      },
      {
        key: 'vendor_id',
        required: false,
        label: 'Vendor ID',
        list: false,
      },
      {
        key: 'name_id',
        required: false,
        label: 'Vendor ID',
        list: false,
      },
      {
        key: 'contract_id',
        required: false,
        label: 'Contract ID',
        list: false,
      },
      {
        key: 'contract_id',
        required: false,
        label: 'Contract ID',
        list: false,
      },
      {
        key: 'status',
        label: 'Status',
        required: false,
        choices: {
          draft: 'Draft',
          reviewing: 'Reviewing',
          deploying: 'Deploying',
          canceled: 'Canceled',
          completed: 'Completed',
        },
      list: true,
      },
      {
        key: 'type',
        label: 'Type',
        required: false,
        choices: {
            new: 'New',
            update: 'Update',
            remove: 'Remove',
        },
        list: true,
      },
    ]);
  });
});