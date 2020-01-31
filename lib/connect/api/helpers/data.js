/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const sanitizeIds = (items, idField) => {
  const sanitized = [];
  _.each(items, (item) => {
    sanitized.push(_.assign({ id: item[idField] }, _.pickBy(item, (v, k) => k !== idField)));
  });
  return sanitized;
};

const sanitizeItems = (items) => sanitizeIds(items, 'item_id');
const sanitizeParams = (items) => sanitizeIds(items, 'param_id');

const paramDictToArray = (params) => {
  const results = [];
  _.each(params, (value, id) => results.push({ id, value }));
  return results;
};

const paramErrorDictToArray = (params) => {
  const results = [];
  // eslint-disable-next-line camelcase
  _.each(params, (value_error, id) => results.push({ id, value_error }));
  return results;
};

const filtersToQuery = (data, filtersMap) => {
  const queryParams = {};
  _.forOwn(data, (value, key) => {
    const filterName = filtersMap[key];
    if (filterName !== undefined && value !== undefined && value !== null) {
      queryParams[filterName] = value;
    }
  });
  return queryParams;
};

module.exports = {
  sanitizeIds,
  sanitizeItems,
  sanitizeParams,
  paramDictToArray,
  paramErrorDictToArray,
  filtersToQuery,
};
