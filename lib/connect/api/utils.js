/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Query } = require('rql/query');
const _ = require('lodash');

/* eslint-disable consistent-return */
const getQueryTerm = (query, name, value) => {
  if (Array.isArray(value)) {
    return query.in(name, value);
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return query.eq(name, value);
  }
  throw new Error(`Parameters of type ${typeof value} are not supported`);
};

const prepareFilters = (bundle, filtersMap) => {
  let query = new Query();
  _.forOwn(bundle.inputData, (value, key) => {
    const filterName = filtersMap[key];
    if (filterName !== undefined && value !== undefined && value !== null) {
      query = getQueryTerm(query, key, value);
    }
  });
  return query;
};

module.exports = { getQueryTerm, prepareFilters };
