/**
 * This file is part of the CloudBlue Connect Zapier Extension.
 *
 * @copyright (c) 2025 CloudBlue, Inc. All Rights Reserved.
 */


const { addTaskIdToHeader } = require('../../lib/middleware');


describe('middleware', () => {
  it('add the x-zapier-fulfillment-stepid request header', () => {
    const request = addTaskIdToHeader({headers: {}}, null, null);
    expect(request).toBeInstanceOf(Object);
    expect(request).toHaveProperty('headers');
    expect(request.headers).toHaveProperty('x-zapier-fulfillment-stepid');
  });
});