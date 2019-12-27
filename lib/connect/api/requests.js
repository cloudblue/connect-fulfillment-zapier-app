/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const { getConnectClient } = require('../http');

const prepareFilters = (bundle) => ({
  type: bundle.inputData.type,
  status: bundle.inputData.status,
  id: bundle.inputData.id,
  assetId: bundle.inputData.asset_id,
  assetProductId: bundle.inputData.product_id,
  assetProductName: bundle.inputData.product_name,
  assetConnectionHubId: bundle.inputData.hub_id,
  assetConnectionHubName: bundle.inputData.hub_name,
  assetConnectionProviderId: bundle.inputData.provider_id,
  assetConnectionProviderName: bundle.inputData.provider_name,
  assetConnectionVendorId: bundle.inputData.vendor_id,
  assetConnectionVendorName: bundle.inputData.vendor_name,
  assetTiersCustomerId: bundle.inputData.customer_id,
  assetTiersTier1Id: bundle.inputData.t1_id,
  assetTiersTier2Id: bundle.inputData.t2_id,
});

const listRequests = async (z, bundle, orderBy) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const limit = bundle.inputData.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    response = await ff.listRequests(prepareFilters(bundle), orderBy, limit, offset);
    results = results.concat(response);
    offset += limit;
    if (bundle.inputData.process_in_batch === true) {
      break;
    }
  } while (response.length === limit);
  return Promise.resolve(results);
};

const parsePhoneNumber = (number, country) => {
  try {
    const parsed = phoneUtil.parseAndKeepRawInput(number, country);
    const countryCode = `+${parsed.getCountryCode()}`;
    const nationalSignificantNumber = phoneUtil.getNationalSignificantNumber(parsed);
    let areaCode = '';
    let subscriberNumber = nationalSignificantNumber;
    const areaCodeLength = phoneUtil.getLengthOfGeographicalAreaCode(parsed);
    if (areaCodeLength > 0) {
      areaCode = nationalSignificantNumber.substr(0, areaCodeLength);
      subscriberNumber = nationalSignificantNumber.substr(areaCodeLength);
    }
    return {
      country_code: countryCode,
      area_code: areaCode,
      phone_number: subscriberNumber,
      extension: parsed.getExtension() || '',
    };
  } catch (e) {
    return {};
  }
};

const getTier = (bundle, t) => {
  const phone = parsePhoneNumber(bundle.inputData[`${t}_phone`], bundle.inputData[`${t}_country`]);
  return {
    name: bundle.inputData[`${t}_company_name`],
    external_id: bundle.inputData[`${t}_external_id`],
    external_uid: bundle.inputData[`${t}_external_uid`] || uuidv4(),
    contact_info: {
      address_line1: bundle.inputData[`${t}_address1`],
      address_line2: bundle.inputData[`${t}_address2`],
      postal_code: bundle.inputData[`${t}_postal_code`],
      city: bundle.inputData[`${t}_city`],
      state: bundle.inputData[`${t}_state`],
      country: bundle.inputData[`${t}_country`],
      contact: {
        phone_number: phone,
        first_name: bundle.inputData[`${t}_first_name`],
        last_name: bundle.inputData[`${t}_last_name`],
        email: bundle.inputData[`${t}_email`],
      },
    },
  };
};

const createPurchaseRequest = async (z, bundle) => {
  const req = {
    type: 'purchase',
    asset: {
      external_id: bundle.inputData.asset_external_id,
      external_uid: bundle.inputData.asset_external_uid || uuidv4(),
      connection: {
        id: bundle.inputData.connection_id,
      },
      items: bundle.inputData.items,
      params: bundle.inputData.params,
      tiers: {
        tier1: getTier(bundle, 't1'),
        customer: getTier(bundle, 'customer'),
      },
    },
  };
  if (bundle.inputData.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = getTier(bundle, 't2');
  }
  /* eslint-disable no-param-reassign */
  _.each(req.asset.items, (item) => {
    item.id = item.item_id;
    delete item.item_id;
  });
  _.each(req.asset.params, (param) => {
    param.id = param.param_id;
    delete param.param_id;
  });
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(req);
  return Promise.resolve(response);
};

module.exports = { listRequests, createPurchaseRequest };
