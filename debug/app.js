
const assert = require('assert');

describe('message', () => {
  it('message 1', (done) => {
    setTimeout(() => done(), 1000);
  });
  it('message 2', () => {});
})