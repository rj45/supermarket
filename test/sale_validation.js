const assert = require('assert');

const { runValidationTestCases } = require('./helpers');
const { Register, EACH } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with a valid product', () => {
    const validProduct = {
      sku: 'cherios',
      name: 'cherios',
      unit: EACH,
      qty: 1,
      price: 4.99,
    };

    beforeEach(() => {
      register.addProduct(validProduct);
    });

    describe('with sale input validation', () => {
      const validSale = {
        sku: 'cherios',
        type: 'PriceSale',
        price: 2.99,
      };

      const testCases = [
        { field: 'sku', value: null, error: /sku is null/ },
        { field: 'sku', value: '', error: /sku is empty/ },
        { field: 'sku', value: 99, error: /sku is not a string/ },
        { field: 'sku', value: 'unknown', error: /could not find product/ },
        { field: 'type', value: null, error: /sale type not found/ },
        { field: 'type', value: '', error: /sale type not found/ },
        { field: 'type', value: 99, error: /sale type not found/ },
        { field: 'type', value: 'unknown', error: /sale type not found/ },
        { field: 'price', value: null, error: /price is null/ },
        // products can be free if on sale for free!
        { field: 'price', value: 0 },
        { field: 'price', value: -1, error: /price is negative/ },
        { field: 'price', value: 'a string', error: /price is not a number/ },
      ];

      runValidationTestCases({
        action: sale => register.addSale(sale),
        validThing: validSale,
        testCases,
      });

      it('does not allow duplicate skus', () => {
        register.addSale(validSale);
        const saleWithSameSku = {
          sku: validSale.sku,
          type: 'PriceSale',
          price: 1.99,
        };
        assert.throws(
          () => register.addSale(saleWithSameSku),
          /sku already has sale applied/
        );
      });
    });
  });
});
