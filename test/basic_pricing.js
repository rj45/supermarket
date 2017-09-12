const assert = require('assert');
const { Register, EACH, GRAMS } = require('../lib/register');

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('with a valid product', () => {
    const CHERIOS_PRICE = 4.99;
    const RAISENS_PRICE = 1.99;

    beforeEach(() => {
      register.addProduct({
        sku: 'cherios',
        name: 'cherios',
        unit: EACH,
        qty: 1,
        price: CHERIOS_PRICE,
      });
      register.addProduct({
        sku: 'raisens',
        name: 'raisens',
        unit: GRAMS,
        qty: 100,
        price: RAISENS_PRICE,
      });
    });

    describe('each pricing', () => {
      const testCases = [
        { scan: { sku: 'cherios', qty: 1 }, total: CHERIOS_PRICE },
        { scan: { sku: 'cherios', qty: 2 }, total: 2 * CHERIOS_PRICE },
        {
          scan: { sku: 'raisens', qty: 23 },
          // raisens are priced per 100 grams
          total: (0.23 * RAISENS_PRICE).toFixed(2),
        },
      ];

      testCases.forEach(testCase => {
        const displayScan = prettyScan(testCase.scan);

        it(`totals ${displayScan} to ${testCase.total}`, () => {
          register.scan(testCase.scan);

          assert.equal(register.total, testCase.total);
        });

        function prettyScan(scan) {
          return `${scan.sku} x${scan.qty}`;
        }
      });
    });
  });
});
