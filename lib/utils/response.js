/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */
class Response {
  constructor(response) {
    this._response = response;
  }

  get ok() {
    return this._response.status >= 200 && this._response.status < 300;
  }

  get status() {
    return this._response.status;
  }

  async json() {
    return Promise.resolve(this._response.json);
  }

  async text() {
    return Promise.resolve(this._response.content);
  }
}

module.exports = Response;
