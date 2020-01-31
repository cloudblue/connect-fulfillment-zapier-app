/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const Response = require('../../../lib/connect/http/response');

describe('Response', () => {
  it('wraps the zapier response object', async () => {
      const resp = {
          status: 200,
          content: 'Hello world',
          headers: {
            'x-test-header': 'hello world'
          },
          json: {
              text: 'Hello world'
          }
      };
      const response = new Response(resp);
      expect(response.ok).toEqual(true);
      expect(response.status).toEqual(200);
      expect(response.headers).toEqual({'x-test-header': 'hello world'})
      expect(response.text()).toBeInstanceOf(Promise);
      expect(response.json()).toBeInstanceOf(Promise);
      const content = await response.text();
      expect(content).toEqual('Hello world');
      const data = await response.json();
      expect(data).toEqual({
        text: 'Hello world'
      });
  });
});