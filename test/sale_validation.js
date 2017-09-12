const { runValidationsFor } = require('./helpers');
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

      // TODO: may want more specific error messages than just 'field is invalid'
      const testCases = [
        { field: 'sku', value: null, error: /sku is invalid/ },
        { field: 'sku', value: '', error: /sku is invalid/ },
        { field: 'sku', value: 99, error: /sku is invalid/ },
        { field: 'sku', value: 'unknown', error: /could not find product/ },
        { field: 'type', value: null, error: /sale type not found/ },
        { field: 'type', value: '', error: /sale type not found/ },
        { field: 'type', value: 99, error: /sale type not found/ },
        { field: 'type', value: 'unknown', error: /sale type not found/ },
        { field: 'price', value: null, error: /price is invalid/ },
        // products can be free if on sale for free!
        { field: 'price', value: 0 },
        { field: 'price', value: -1, error: /price is invalid/ },
        { field: 'price', value: 'a string', error: /price is invalid/ },
      ];

      runValidationsFor({
        action: sale => register.addSale(sale),
        validThing: validSale,
        testCases,
      });
    });
  });
});
