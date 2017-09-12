const assert = require('assert');
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

    // TODO: most of this is copy-pasta from product_validation...
    // if we have a third instance, it should be refactored to DRY it up
    describe('with line input validation', () => {
      const validLine = {
        sku: 'cherios',
        unit: EACH,
        qty: 1,
      };

      // TODO: may want more specific error messages than just 'field is invalid'
      const testCases = [
        { field: 'sku', value: null, error: /sku is invalid/ },
        { field: 'sku', value: '', error: /sku is invalid/ },
        { field: 'sku', value: 99, error: /sku is invalid/ },
        { field: 'qty', value: null, error: /qty is invalid/ },
        { field: 'qty', value: 0, error: /qty is invalid/ },
        { field: 'qty', value: -1, error: /qty is invalid/ },
        { field: 'qty', value: 'a string', error: /qty is invalid/ },
      ];

      // make sure the validLine is actually valid
      it('does not error with a valid line', () => {
        register.scan(validLine);
      });

      // do table driven tests
      testCases.forEach(testCase => {
        const displayValue = handleEmptyString(testCase.value);
        const displayCondition = handlePassOrError(testCase.error);

        it(`${displayCondition} when ${testCase.field} is ${displayValue}`, () => {
          const errantLine = modifyLineFieldWithValue(
            testCase.field,
            testCase.value
          );

          function addErrantLine() {
            register.scan(errantLine);
          }

          if (testCase.error) {
            assert.throws(addErrantLine, testCase.error);
          } else {
            addErrantLine();
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

      function modifyLineFieldWithValue(field, value) {
        const errantLine = Object.assign({}, validLine); // make a clone
        errantLine[field] = value;
        return errantLine;
      }
    });
  });
});
