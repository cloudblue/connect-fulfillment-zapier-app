/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');

const prepareFilters = (bundle, filtersMap) => {
  const queryParams = {};
  _.forOwn(bundle.inputData, (value, key) => {
    const filterName = filtersMap[key];
    if (filterName !== undefined && value !== undefined && value !== null) {
      queryParams[filterName] = value;
    }
  });
  return queryParams;
};

module.exports = { prepareFilters };
