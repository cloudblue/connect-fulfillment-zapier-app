/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');


const { Listings } = require('@cloudblueconnect/connect-javascript-sdk');
// const { filtersToQuery, paramDictToArray, paramErrorDictToArray } = require('../helpers/data');
const { filtersToQuery } = require('../helpers/data');

const LISTING_REQUEST_FILTERS_MAP = {
  id: 'id',
  marketplace_id: 'marketplace__id',
  marketplace_name: 'marketplace__name',
  product_id: 'product__id',
  product_name: 'product__name',
  provider_id: 'provider__id',
  vendor_id: 'vendor__id',
  vendor_name: 'vendor__name',
  contract_id: 'contract__id',
  contract_name: 'contract__name',
  state: 'state',
  type: 'type',
};

const searchListingRequests = async (client, data) => {
  const listings = new Listings(client);
  const limit = 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, LISTING_REQUEST_FILTERS_MAP);
    if (data.created_before || data.created_after) {
      queryParams.created = {};
    }
    if (data.created_before) {
      queryParams.created.$le = moment(data.created_before).toISOString();
    }
    if (data.created_after) {
      queryParams.created.$ge = moment(data.created_after).toISOString();
    }
    queryParams.limit = limit;
    queryParams.offset = offset;
    response = await listings.searchListingRequests(queryParams);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);
  return Promise.resolve(results);
};


const changeListingRequestStatus = async (client, data) => {
  const listing = new Listings(client);
  let response;
  if (data.action === 'deploy') {
    response = await listing.deployListingRequest(data.id);
  } else if (data.action === 'refine') {
    response = await listing.refineListingRequest(data.id);
  } else if (data.action === 'complete') {
    response = await listing.completeListingRequest(data.id);
  } else if (data.action === 'cancel') {
    response = await listing.cancelListingRequest(data.id);
  } else {
    throw new Error('Invoke an undefined action of ListingRequest');
  }
  return Promise.resolve(response);
};


module.exports = {
  searchListingRequests,
  changeListingRequestStatus,
};
