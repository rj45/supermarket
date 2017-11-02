const assert = require('assert');
const { Register, EACH, GRAMS } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with PriceSale', () => {
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

  describe('with XForYSale', () => {
    describe('with an each priced product', () => {
      const REGULAR_PRICE = 4.99;
      const BUY_SOME = 4;
      const FOR_THE_PRICE_OF = 3;

      beforeEach(() => {
        register.addProduct({
          sku: 'cherios',
          name: 'cherios',
          unit: EACH,
          qty: 1,
          price: REGULAR_PRICE,
        });
        register.addSale({
          sku: 'cherios',
          type: 'XForYSale',
          // buy 4 for the price of 3
          minQty: BUY_SOME,
          priceQty: FOR_THE_PRICE_OF,
        });
      });

      it('charges the regular price below the minQty', () => {
        register.scan({ sku: 'cherios', qty: 3 });

        assert.equal(register.total, 3 * REGULAR_PRICE);
      });

      it('charges the sale price for 4', () => {
        register.scan({ sku: 'cherios', qty: 4 });

        assert.equal(register.total, FOR_THE_PRICE_OF * REGULAR_PRICE);
      });

      it('charges a discount for extra qty', () => {
        register.scan({ sku: 'cherios', qty: 5 });

        const costOfEachItem = REGULAR_PRICE * FOR_THE_PRICE_OF / BUY_SOME;
        assert.equal(register.total, (5 * costOfEachItem).toFixed(2));
      });
    });
  });
});
