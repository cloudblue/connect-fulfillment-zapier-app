/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */
const { AbstractHttpAdapter } = require('@cloudblueconnect/connect-javascript-sdk');

const Response = require('./response');

class ZapierHttpAdapter extends AbstractHttpAdapter {
  /* eslint-disable class-methods-use-this */
  prepareRequest(url, options) {
    return { url, options };
  }

  parseResponse(response) {
    return new Response(response);
  }
}

module.exports = ZapierHttpAdapter;
