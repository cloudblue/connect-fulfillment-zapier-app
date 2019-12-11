/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
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
