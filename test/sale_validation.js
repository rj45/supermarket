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

    const commonTestCases = [
      { field: 'sku', value: null, error: /sku is null/ },
      { field: 'sku', value: '', error: /sku is empty/ },
      { field: 'sku', value: 99, error: /sku is not a string/ },
      { field: 'sku', value: 'unknown', error: /could not find product/ },
      { field: 'type', value: null, error: /type is null/ },
      { field: 'type', value: '', error: /type is empty/ },
      { field: 'type', value: 99, error: /type is not a string/ },
      { field: 'type', value: 'unknown', error: /type not found/ },
    ];

    describe('with PriceSale input validation', () => {
      const validSale = {
        sku: 'cherios',
        type: 'PriceSale',
        price: 2.99,
      };

      const saleTestCases = [
        { field: 'price', value: null, error: /price is null/ },
        // products can be free if on sale for free!
        { field: 'price', value: 0 },
        { field: 'price', value: -1, error: /price is negative/ },
        { field: 'price', value: 'a string', error: /price is not a number/ },
      ];

      runValidationTestCases({
        action: sale => register.addSale(sale),
        validThing: validSale,
        testCases: commonTestCases.concat(saleTestCases),
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
          /sku is already in use/
        );
      });
    });

    describe('with XForYSale input validation', () => {
      const validSale = {
        sku: 'cherios',
        type: 'XForYSale',
        minQty: 2,
        priceQty: 1,
      };

      const saleTestCases = [
        { field: 'minQty', value: null, error: /minQty is null/ },
        { field: 'minQty', value: 0, error: /minQty is zero/ },
        { field: 'minQty', value: -1, error: /minQty is negative/ },
        { field: 'minQty', value: 'a string', error: /minQty is not a number/ },
        { field: 'priceQty', value: null, error: /priceQty is null/ },
        { field: 'priceQty', value: 0, error: /priceQty is zero/ },
        { field: 'priceQty', value: -1, error: /priceQty is negative/ },
        {
          field: 'priceQty',
          value: 'a string',
          error: /priceQty is not a number/,
        },
      ];

      runValidationTestCases({
        action: sale => register.addSale(sale),
        validThing: validSale,
        testCases: commonTestCases.concat(saleTestCases),
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
          /sku is already in use/
        );
      });
    });
  });
});
