const assert = require('assert');
const { Register, EACH, GRAMS, POUNDS, OUNCES } = require('../lib/register');

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
      { field: 'sku', value: null, error: /sku is invalid/ },
      { field: 'sku', value: '', error: /sku is invalid/ },
      { field: 'sku', value: 99, error: /sku is invalid/ },
      { field: 'name', value: null, error: /name is invalid/ },
      { field: 'name', value: '', error: /name is invalid/ },
      { field: 'name', value: 99, error: /name is invalid/ },
      { field: 'unit', value: null, error: /unit is invalid/ },
      { field: 'unit', value: 'weird', error: /unit is invalid/ },
      { field: 'qty', value: null, error: /qty is invalid/ },
      { field: 'qty', value: 0, error: /qty is invalid/ },
      { field: 'qty', value: -1, error: /qty is invalid/ },
      { field: 'qty', value: 'a string', error: /qty is invalid/ },
      { field: 'price', value: null, error: /price is invalid/ },
      { field: 'price', value: 0, error: /price is invalid/ }, // no free products
      { field: 'price', value: -1, error: /price is invalid/ },
      { field: 'price', value: 'a string', error: /price is invalid/ },
    ];

    it('does not error with a valid product', () => {
      register.addProduct(validProduct);
    });

    it('does not error with gram units', () => {
      const product = modifyProductFieldWithValue('unit', GRAMS);
      register.addProduct(product);
    });

    it('does not error with pounds unit', () => {
      const product = modifyProductFieldWithValue('unit', POUNDS);
      register.addProduct(product);
    });

    it('does not error with ounces unit', () => {
      const product = modifyProductFieldWithValue('unit', OUNCES);
      register.addProduct(product);
    });

    // do table driven tests
    testCases.forEach(testCase => {
      const displayValue = handleEmptyString(testCase.value);

      it(`errors when ${testCase.field} is ${displayValue}`, () => {
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
