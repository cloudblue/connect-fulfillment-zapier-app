/**
 * This file is part of the CloudBlue Connect Zapier Extension.
 *
 * @copyright (c) 2025 CloudBlue, Inc. All Rights Reserved.
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
