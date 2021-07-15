/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */
const _ = require('lodash');
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
    queryParams.limit = 100;
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
  let queryParams;

  /*
  let caseStatus;
  if (data.case_status) {
    caseStatus = data.case_status;
  } else {
    caseStatus = 'pending';
  }
  */
  if (!data.case_id) {
    let caseResponse = [];
    let allCases = [];
    /* eslint-disable no-await-in-loop */
    do {
      queryParams = filtersToQuery(data, { case_status: 'state' });
      queryParams.limit = 100;
      queryParams.offset = offset;
      // logger.debug(`Query Params ${data.case_status}`);

      // queryParams.$ordering = orderBy;
      caseResponse = await client.cases.search(queryParams);
      allCases = allCases.concat(caseResponse);
      offset += limit;
    } while (caseResponse.length === limit);
    let messageResponse = null;

    /* eslint-disable no-restricted-syntax, no-continue */
    for (const caseRecord of allCases) {
      offset = 0;
      do {
        queryParams = filtersToQuery(data, CASE_COMMENTS_FILTERS_MAP);
        queryParams.limit = 100;
        queryParams.offset = offset;
        messageResponse = await client.conversations.messages(caseRecord.id).search(queryParams);
        /* eslint-disable no-param-reassign */
        _.each(messageResponse, (msg) => { msg.case = caseRecord.id; });
        results = results.concat(messageResponse);
        offset += limit;
      } while (messageResponse.length === limit);
    }
    response = Promise.resolve(results);
  } else {
    /* eslint-disable no-await-in-loop */
    let messageResponse = [];
    do {
      queryParams = filtersToQuery(data, CASE_COMMENTS_FILTERS_MAP);
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
      messageResponse = await client.conversations.messages(data.case_id).search(queryParams);
      /* eslint-disable no-param-reassign */
      _.each(messageResponse, (msg) => { msg.case = data.case_id; });
      results = results.concat(messageResponse);
      offset += limit;
    } while (messageResponse.length === limit);
    response = Promise.resolve(results);
  }
  return response;
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
