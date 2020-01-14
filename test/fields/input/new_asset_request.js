const should = require('should');
const _ = require('lodash');
const ifields = require('../../../lib/fields/input/new_asset_request');

describe('Connect Fulfillment Zapier App - New Asset Request fields', () => {
  it('should return purchase fields', async () => {
    const purchaseFields = [
      { key: 'hub_id', label: 'Hub ID', required: true },
      { key: 'asset_external_id', label: 'Asset External ID', required: true },
      { key: 'asset_external_uid', label: 'Asset External UID', required: false },
      {
        key: 'reseller_tiers',
        label: 'Reseller Tiers',
        type: 'string',
        choices: {
          t2t1: 'Tier 1 + Tier 2',
          t1: 'Tier 1',
        },
        required: true,
        altersDynamicFields: true,
        default: 't1',
      },
      // tier 1
      { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
      { key: 't1_external_uid', label: 'Tier 1 External UID', required: false },
      { key: 't1_company_name', label: 'Tier 1 Company', required: true },
      { key: 't1_address1', label: 'Tier 1 Address Line 1', required: true },
      { key: 't1_address2', label: 'Tier 1 Address Line 2', required: false },
      { key: 't1_postal_code', label: 'Tier 1 Postal Code', required: true },
      { key: 't1_city', label: 'Tier 1 City', required: true },
      { key: 't1_state', label: 'Tier 1 State', required: true },
      { key: 't1_country', label: 'Tier 1 Country', required: true },
      { key: 't1_first_name', label: 'Tier 1 Contact First Name', required: true },
      { key: 't1_last_name', label: 'Tier 1 Contact Last Name', required: true },
      { key: 't1_email', label: 'Tier 1 Email', required: true },
      { key: 't1_phone', label: 'Tier 1 Phone Number', required: true },
      { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
      // customer
      { key: 'customer_external_id', label: 'Customer External ID', required: true },
      { key: 'customer_external_uid', label: 'Customer External UID', required: false },
      { key: 'customer_company_name', label: 'Customer Company', required: true },
      { key: 'customer_address1', label: 'Customer Address Line 1', required: true },
      { key: 'customer_address2', label: 'Customer Address Line 2', required: false },
      { key: 'customer_postal_code', label: 'Customer Postal Code', required: true },
      { key: 'customer_city', label: 'Customer City', required: true },
      { key: 'customer_state', label: 'Customer State', required: true },
      { key: 'customer_country', label: 'Customer Country', required: true },
      { key: 'customer_first_name', label: 'Customer Contact First Name', required: true },
      { key: 'customer_last_name', label: 'Customer Contact Last Name', required: true },
      { key: 'customer_email', label: 'Customer Email', required: true },
      { key: 'customer_phone', label: 'Customer Phone Number', required: true },
      // items
      {
        key: 'items',
        children: [
          {
            key: 'item_id',
            label: 'Item ID',
            required: true,
          },
          {
            key: 'quantity',
            label: 'Quantity',
            required: true,
          },
        ],
      },
      {
        key: 'params',
        children: [
          {
            key: 'param_id',
            label: 'Param ID',
            required: false,
          },
          {
            key: 'value',
            label: 'Value',
            required: false,
          },
        ],
      },
    ];
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        request_type: 'purchase'
      }
    };
    const results = await f(null, bundle);
    results.should.containDeep(purchaseFields);
  });
  // it('should return purchase fields (with tier 2)', async () => {
  //   const purchaseFields = [
  //     { key: 'connection_id', label: 'Connection ID', required: true },
  //     { key: 'asset_external_id', label: 'Asset External ID', required: true },
  //     { key: 'asset_external_uid', label: 'Asset External UID', required: false },
  //     {
  //       key: 'reseller_tiers',
  //       label: 'Reseller Tiers',
  //       type: 'string',
  //       choices: {
  //         t2t1: 'Tier 1 + Tier 2',
  //         t1: 'Tier 1',
  //       },
  //       required: true,
  //       altersDynamicFields: true,
  //       default: 't1',
  //     },
  //     // tier 1
  //     { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
  //     { key: 't1_external_uid', label: 'Tier 1 External UID', required: false },
  //     { key: 't1_company_name', label: 'Tier 1 Company', required: true },
  //     { key: 't1_address1', label: 'Tier 1 Address Line 1', required: true },
  //     { key: 't1_address2', label: 'Tier 1 Address Line 2', required: false },
  //     { key: 't1_postal_code', label: 'Tier 1 Postal Code', required: true },
  //     { key: 't1_city', label: 'Tier 1 City', required: true },
  //     { key: 't1_state', label: 'Tier 1 State', required: true },
  //     { key: 't1_country', label: 'Tier 1 Country', required: true },
  //     { key: 't1_first_name', label: 'Tier 1 Contact First Name', required: true },
  //     { key: 't1_last_name', label: 'Tier 1 Contact Last Name', required: true },
  //     { key: 't1_email', label: 'Tier 1 Email', required: true },
  //     { key: 't1_phone', label: 'Tier 1 Phone Number', required: true },
  //     { key: 't1_external_id', label: 'Tier 1 External ID', required: true },
  //     // customer
  //     { key: 'customer_external_id', label: 'Customer External ID', required: true },
  //     { key: 'customer_external_uid', label: 'Customer External UID', required: false },
  //     { key: 'customer_company_name', label: 'Customer Company', required: true },
  //     { key: 'customer_address1', label: 'Customer Address Line 1', required: true },
  //     { key: 'customer_address2', label: 'Customer Address Line 2', required: false },
  //     { key: 'customer_postal_code', label: 'Customer Postal Code', required: true },
  //     { key: 'customer_city', label: 'Customer City', required: true },
  //     { key: 'customer_state', label: 'Customer State', required: true },
  //     { key: 'customer_country', label: 'Customer Country', required: true },
  //     { key: 'customer_first_name', label: 'Customer Contact First Name', required: true },
  //     { key: 'customer_last_name', label: 'Customer Contact Last Name', required: true },
  //     { key: 'customer_email', label: 'Customer Email', required: true },
  //     { key: 'customer_phone', label: 'Customer Phone Number', required: true },
  //     // items
  //     {
  //       key: 'items',
  //       children: [
  //         {
  //           key: 'item_id',
  //           label: 'Item ID',
  //           required: true,
  //         },
  //         {
  //           key: 'quantity',
  //           label: 'Quantity',
  //           required: true,
  //         },
  //       ],
  //     },
  //     {
  //       key: 'params',
  //       children: [
  //         {
  //           key: 'param_id',
  //           label: 'Param ID',
  //           required: false,
  //         },
  //         {
  //           key: 'value',
  //           label: 'Value',
  //           required: false,
  //         },
  //       ],
  //     },
  //   ];
  //   const f = _.find(ifields, (val) => typeof val === 'function');
  //   const bundle = {
  //     inputData: {
  //       request_type: 'purchase',
  //       reseller_tiers: 't2t1',
  //     }
  //   };
  //   const results = await f(null, bundle);
  //   console.log(results);
  //   results.should.containDeep(purchaseFields);
  // });
  it('should return change fields', async () => {
    const changeFields = [
      { key: 'asset_id', label: 'Asset ID', required: true },
      // items
      {
        key: 'items',
        children: [
          {
            key: 'item_id',
            label: 'Item ID',
            required: true,
          },
          {
            key: 'old_quantity',
            label: 'Old Quantity',
            required: true,
          },
          {
            key: 'quantity',
            label: 'Quantity',
            required: true,
          },
        ],
      },
      {
        key: 'external_attributes',
        children: [
          {
            key: 'param_id',
            label: 'Param ID',
            required: false,
          },
          {
            key: 'value',
            label: 'Value',
            required: false,
          },
        ],
      },
    ];
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        request_type: 'change'
      }
    };
    const results = await f(null, bundle);
    results.should.containDeep(changeFields);
  });
  it('should return cancel fields', async () => {
    const cancelFields = [
      { key: 'asset_id', label: 'Asset ID', required: true },
      {
        key: 'external_attributes',
        children: [
          {
            key: 'param_id',
            label: 'Param ID',
            required: false,
          },
          {
            key: 'value',
            label: 'Value',
            required: false,
          },
        ],
      },
    ];
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        request_type: 'cancel'
      }
    };
    const results = await f(null, bundle);
    results.should.containDeep(cancelFields);
  });
  it('returns an empty array', async () => {
    const f = _.find(ifields, (val) => typeof val === 'function');
    const bundle = {
      inputData: {
        request_type: 'fake'
      }
    };
    const results = await f(null, bundle);
    results.should.be.an.Array();
    results.should.be.empty();
  });
});