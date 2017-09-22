const units = require('./units');
const { Products } = require('./products');
const { Bill } = require('./bill');
const { Sales } = require('./sales');
const {
  ProductValidator,
  LineValidator,
  SaleValidator,
} = require('./validator');

class Register {
  constructor() {
    this._products = new Products();
    this._productValidator = new ProductValidator(this._products);

    this._bill = new Bill(this._products);
    this._lineValidator = new LineValidator(this._bill);

    this._sales = new Sales(this._products);
    this._saleValidator = new SaleValidator(this._sales);
  }

  addProduct(productAttributes) {
    this._productValidator.assertValid(productAttributes);
    this._products.add(productAttributes);
  }

  addSale(saleAttributes) {
    this._saleValidator.assertValid(saleAttributes);
    this._sales.add(saleAttributes);
  }

  scan(lineAttributes) {
    this._lineValidator.assertValid(lineAttributes);
    this._bill.add(lineAttributes);
  }

  get total() {
    // TODO: not happy with this logic here... maybe break it out into
    // another class?
    const discountedTotal =
      this._bill.total - this._sales.totalDiscountFor(this._bill);
    return roundToNearestCent(discountedTotal);
  }
}

const CENTS_PER_DOLLAR = 100;

function roundToNearestCent(value) {
  return Math.round(value * CENTS_PER_DOLLAR) / CENTS_PER_DOLLAR;
}

module.exports = Object.assign({}, units, {
  Register,
});
