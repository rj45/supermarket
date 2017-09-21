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

    describe('with line input validation', () => {
      const validLine = {
        sku: 'cherios',
        unit: EACH,
        qty: 1,
      };

      const testCases = [
        { field: 'sku', value: null, error: /sku is null/ },
        { field: 'sku', value: '', error: /sku is empty/ },
        { field: 'sku', value: 99, error: /sku is not a string/ },
        { field: 'sku', value: 'unknown', error: /could not find product/ },
        { field: 'qty', value: null, error: /qty is null/ },
        { field: 'qty', value: 0, error: /qty is zero/ },
        { field: 'qty', value: -1, error: /qty is negative/ },
        { field: 'qty', value: 'a string', error: /qty is not a number/ },
      ];

      runValidationTestCases({
        action: line => register.scan(line),
        validThing: validLine,
        testCases,
      });
    });
  });
});
