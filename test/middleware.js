const should = require('should');
const { addTaskIdToHeader } = require('../lib/middleware');


describe('Connect Fulfillment Zapier App - Middleware', () => {
  it('add the x-zapier-fulfillment-stepid request header', (done) => {
    const request = addTaskIdToHeader({headers: {}}, null, null);
    request.should.be.an.Object();
    request.should.have.property('headers');
    request.headers.should.have.property('x-zapier-fulfillment-stepid');
    done();
  });
});