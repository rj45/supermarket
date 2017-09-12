const assert = require('assert');
const { Register, EACH, GRAMS, POUNDS, OUNCES } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with product validation', () => {
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
      { field: 'unit', value: GRAMS },
      { field: 'unit', value: POUNDS },
      { field: 'unit', value: OUNCES },
      { field: 'unit', value: 'weird', error: /unit is invalid/ },
      { field: 'unit', value: 'weird', error: /unit is invalid/ },
      { field: 'qty', value: null, error: /qty is invalid/ },
      { field: 'qty', value: 0, error: /qty is invalid/ },
      { field: 'qty', value: -1, error: /qty is invalid/ },
      { field: 'qty', value: 'a string', error: /qty is invalid/ },
      { field: 'price', value: null, error: /price is invalid/ },
      // no free products by default -- could use a coupon or sale to make a product free though
      { field: 'price', value: 0, error: /price is invalid/ },
      { field: 'price', value: -1, error: /price is invalid/ },
      { field: 'price', value: 'a string', error: /price is invalid/ },
    ];

    // make sure the validProduct is actually valid
    it('does not error with a valid product', () => {
      register.addProduct(validProduct);
    });

    // do table driven tests
    testCases.forEach(testCase => {
      const displayValue = handleEmptyString(testCase.value);
      const displayCondition = handlePassOrError(testCase.error);

      it(`${displayCondition} when ${testCase.field} is ${displayValue}`, () => {
        const errantProduct = modifyProductFieldWithValue(
          testCase.field,
          testCase.value
        );

        function addErrantProduct() {
          register.addProduct(errantProduct);
        }

        if (testCase.error) {
          assert.throws(addErrantProduct, testCase.error);
        } else {
          addErrantProduct();
        }
      });
    });

    function handleEmptyString(value) {
      if (value === '') {
        return 'empty string';
      }
      return value;
    }

    function handlePassOrError(error) {
      if (error) {
        return 'errors';
      }
      return 'does not error';
    }

    function modifyProductFieldWithValue(field, value) {
      const errantProduct = Object.assign({}, validProduct); // make a clone
      errantProduct[field] = value;
      return errantProduct;
    }
  });
});
