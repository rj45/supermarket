const assert = require('assert');
const { Register, EACH, GRAMS } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with an each priced product', () => {
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
    });

    it('charges the sale price', () => {
      register.scan({ sku: 'cherios', qty: 1 });

      assert.equal(register.total, SALE_PRICE);
    });

    it('charges the sale price for 2', () => {
      register.scan({ sku: 'cherios', qty: 2 });

      assert.equal(register.total, 2 * SALE_PRICE);
    });
  });

  describe('with an weight priced product', () => {
    const RAISENS_PRICE = 3.99;
    const SALE_PRICE = 2.99;

    beforeEach(() => {
      register.addProduct({
        sku: 'raisens',
        name: 'raisens',
        unit: GRAMS,
        qty: 100,
        price: RAISENS_PRICE,
      });
      register.addSale({
        sku: 'raisens',
        type: 'PriceSale',
        price: SALE_PRICE,
      });
    });

    it('charges the sale price for 100 grams', () => {
      register.scan({ sku: 'raisens', qty: 100 });

      assert.equal(register.total, SALE_PRICE);
    });

    it('charges the sale price for 23 grams', () => {
      register.scan({ sku: 'raisens', qty: 23 });

      assert.equal(register.total, (0.23 * SALE_PRICE).toFixed(2));
    });
  });
});
