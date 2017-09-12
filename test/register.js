const assert = require('assert');
const { Register, EACH } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with a product validation', () => {
    it('does not error with a valid product', () => {
      register.addProduct({
        sku: 'cherios',
        name: 'cherios',
        unit: EACH,
        qty: 1,
        price: 4.99,
      });
    });

    it('fails when the sku is falsy', () => {
      assert.throws(() => {
        register.addProduct({
          sku: '',
          name: 'cherios',
          unit: EACH,
          qty: 1,
          price: 4.99,
        });
      }, /sku is invalid/);
    });

    it('fails when the name is falsy', () => {
      assert.throws(() => {
        register.addProduct({
          sku: 'cherios',
          name: '',
          unit: EACH,
          qty: 1,
          price: 4.99,
        });
      }, /name is invalid/);
    });

    it('fails when the unit is weird', () => {
      assert.throws(() => {
        register.addProduct({
          sku: 'cherios',
          name: 'cherios',
          unit: 'weird',
          qty: 1,
          price: 4.99,
        });
      }, /unit is invalid/);
    });
  });
});
