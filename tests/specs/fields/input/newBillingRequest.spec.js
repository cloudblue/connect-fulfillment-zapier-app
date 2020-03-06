/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const { getCreateFields, PROVIDER_FIELDS, VENDOR_FIELDS } = require('../../../../lib/fields/input/new_billing_request');


describe('new billing request', () => {
  it.each([
    ['vendor', VENDOR_FIELDS],
    ['provider', PROVIDER_FIELDS],
    ['other', []],
  ])('getCreateFields returns expected fields for %s', async (accountType, expected) => {
    const bundle = {
      authData: {
        account_type: accountType,
      }
    };
    const fields = await getCreateFields(null, bundle);
    expect(fields).toEqual(expected);
  });
});