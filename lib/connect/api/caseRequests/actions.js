/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const moment = require('moment');
const {
  filtersToQuery,
} = require('../helpers/data');

const CASES_FILTERS_MAP = {
  type: 'type',
  state: 'state',
  id: 'id',
  priority: 'priority',
  from_account: 'from.account',
  from_actor: 'from.actor',
  to_account: 'to.account',
  to_actor: 'to.actor',
  created_by: 'created.by',
};

const CASE_COMMENTS_FILTERS_MAP = {
  id: 'id',
  text: 'search',
};

const searchCases = async (client, data) => {
  const limit = data.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, CASES_FILTERS_MAP);
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
    // queryParams.$ordering = orderBy;
    response = await client.cases.search(queryParams);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);
  return Promise.resolve(results);
};

const searchCaseComments = async (client, data) => {
  const limit = data.records_per_page || 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    const queryParams = filtersToQuery(data, CASE_COMMENTS_FILTERS_MAP);
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
    response = await client.conversations.messages(data.case_id).search(queryParams);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);
  return Promise.resolve(results);
};
const pendCaseRequest = async (client, data) => {
  let response = client.conversations.createMessage(data.case_id, data.message);
  response = await client.cases.pend(data.case_id);
  return Promise.resolve(response);
};

const inquireCaseRequest = async (client, data) => {
  let response = client.conversations.createMessage(data.case_id, data.message);
  response = await client.cases.inquire(data.case_id);
  return Promise.resolve(response);
};

const resolveCaseRequest = async (client, data) => {
  let response = client.conversations.createMessage(data.case_id, data.message);
  response = await client.cases.resolve(data.case_id);
  return Promise.resolve(response);
};

const closeCaseRequest = async (client, data) => {
  const response = await client.cases.close(data.case_id, data.rating, data.feedback);
  return Promise.resolve(response);
};

module.exports = {
  searchCases,
  searchCaseComments,
  pendCaseRequest,
  inquireCaseRequest,
  resolveCaseRequest,
  closeCaseRequest,
};
