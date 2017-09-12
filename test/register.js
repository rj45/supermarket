const assert = require('assert');
const Register = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with an "each priced" product', () => {
    beforeEach(() => {
      register.addProduct({ sku: 'cherios', unit: 'ea', qty: 1, price: 4.99 });
    });

    it('does not error', () => {
      assert.deepEqual(register.errors, []);
    });
  });
});
