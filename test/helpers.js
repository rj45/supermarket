const assert = require('assert');

function runValidationTestCases(params) {
  const { action, validThing, testCases } = params;

  it('does not error when valid', () => {
    action(validThing);
  });

  testCases.forEach(testCase => {
    const displayValue = handleEmptyString(testCase.value);
    const displayCondition = handlePassOrError(testCase.error);

    it(`${displayCondition} when ${testCase.field} is ${displayValue}`, () => {
      const errantThing = modifyThingFieldWithValue(
        testCase.field,
        testCase.value
      );

      function addErrantThing() {
        action(errantThing);
      }

      if (testCase.error) {
        assert.throws(addErrantThing, testCase.error);
      } else {
        addErrantThing();
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

  function modifyThingFieldWithValue(field, value) {
    const errantThing = Object.assign({}, validThing); // make a clone
    errantThing[field] = value;
    return errantThing;
  }
}

module.exports = {
  runValidationTestCases,
};
