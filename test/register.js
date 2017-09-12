const assert = require('assert');
const { Register, EACH } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with a product validation', () => {
    const validProduct = {
      sku: 'cherios',
      name: 'cherios',
      unit: EACH,
      qty: 1,
      price: 4.99,
    };
    // TODO: may want more specific error messages than just 'field is invalid'
    const testCases = [
      { field: 'sku', value: '', error: /sku is invalid/ },
      { field: 'name', value: '', error: /name is invalid/ },
      { field: 'unit', value: 'weird', error: /unit is invalid/ },
      { field: 'qty', value: 0, error: /qty is invalid/ },
      { field: 'qty', value: -1, error: /qty is invalid/ },
      { field: 'qty', value: 'a string', error: /qty is invalid/ },
      { field: 'price', value: 0, error: /price is invalid/ }, // no free products
      { field: 'price', value: -1, error: /price is invalid/ },
      { field: 'price', value: 'a string', error: /price is invalid/ },
    ];

    it('does not error with a valid product', () => {
      register.addProduct(validProduct);
    });

    // do table driven tests
    testCases.forEach(testCase => {
      const displayValue = handleEmptyString(testCase.value);

      it(`fails when ${testCase.field} is ${displayValue}`, () => {
        const errantProduct = modifyProductFieldWithValue(
          testCase.field,
          testCase.value
        );

        assert.throws(() => {
          register.addProduct(errantProduct);
        }, testCase.error);
      });
    });

    function handleEmptyString(value) {
      if (value === '') {
        return 'empty string';
      }
      return value;
    }

    function modifyProductFieldWithValue(field, value) {
      const errantProduct = Object.assign({}, validProduct); // make a clone
      errantProduct[field] = value;
      return errantProduct;
    }
  });
});
