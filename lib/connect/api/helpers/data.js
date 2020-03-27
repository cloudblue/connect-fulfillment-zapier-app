/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const sanitizeIds = (items, idField) => {
  const sanitized = [];
  _.each(items, (item) => {
    if (!_.has(item, idField) && !_.has(item, 'id')) {
      throw new Error('id field does not exists');
    }
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
      if (!Array.isArray(value)) {
        queryParams[filterName] = value;
      } else {
        queryParams[filterName] = { $in: value };
      }
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
