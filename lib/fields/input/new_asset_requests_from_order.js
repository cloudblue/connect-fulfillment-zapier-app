/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { FIELDS_CUSTOMER, FIELDS_TIER_1, FIELDS_TIER_2 } = require('./tiers');

const tier2Fields = (z, bundle) => {
  if (bundle.inputData.reseller_tiers === 't2t1') {
    return FIELDS_TIER_2;
  }
  return [];
};


module.exports = [
  // general
  {
    key: 'hub_id',
    label: 'Hub ID',
    required: true,
    helpText: 'Provide the ID of your hub obtained from Provider Portals Hubs, '
      + 'this zap will place the request like such hub. ID of the hub must have the form of HB-XXXX-XXXX.',
  },
  {
    key: 'asset_external_id',
    label: 'Asset External ID',
    required: true,
    helpText: 'Provide the ID of the asset from the external system, '
      + 'for example pointing to a contract identifier or unique one that will map this asset with.',
  },
  {
    key: 'asset_external_uid',
    label: 'Asset External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the requested '
      + 'asset on the commerce system, in case it\'s not provided a unique UUID will be auto-generated.',
  },
  {
    key: 'reseller_tiers',
    label: 'Tiers involved in the request',
    helpText: 'Define how many tiers are involved in the request, at least Tier 1 (who sold the asset to customer) '
      + 'is required, in case of need you can also specify a chain up to 2 tiers.',
    type: 'string',
    choices: {
      t2t1: 'Tier 1 + Tier 2',
      t1: 'Tier 1',
    },
    required: true,
    altersDynamicFields: true,
    default: 't1',
  },
  // tier 2
  tier2Fields,
  FIELDS_TIER_1,
  FIELDS_CUSTOMER,
  // items
  {
    key: 'items',
    children: [
      {
        key: 'item_id',
        label: 'Item ID',
        required: true,
        helpText: 'This one will have the form of PRD-XXX-XXX-XXX-XXXX and can be seen in Provider portal in '
          + 'the items section of the concrete product you are creating a request for.',
      },
      {
        key: 'quantity',
        label: 'Quantity',
        required: true,
        helpText: 'Please note that quantities for reservation items must be integers, additionally '
          + 'in case you want to specify unlimited quantity you shall use -1.',
      },
    ],
  },
];
