const assert = require('assert');
const { Register, EACH } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with a product', () => {
    const CHERIOS_PRICE = 4.99;
    const SALE_PRICE = 1.99;

    beforeEach(() => {
      register.addProduct({
        sku: 'cherios',
        name: 'cherios',
        unit: EACH,
        qty: 1,
        price: CHERIOS_PRICE,
      });
      register.addSale({
        sku: 'cherios',
        type: 'PriceSale',
        price: SALE_PRICE,
      });
      register.scan({ sku: 'cherios', qty: 1 });
    });

    it('charges the sale price', () => {
      // TODO: not sure what to do about the toFixed(2) here... a Money class I suppose
      assert.equal(register.total.toFixed(2), SALE_PRICE);
    });
  });
});
