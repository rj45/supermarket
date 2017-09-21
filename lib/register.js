const units = require('./units');
const { Products } = require('./products');
const { Bill } = require('./bill');
const { Sales } = require('./sales');

class Register {
  constructor() {
    this._products = new Products();
    this._bill = new Bill(this._products);
    this._sales = new Sales(this._products);
  }

  addProduct(productAttributes) {
    this._products.add(productAttributes);
  }

  addSale(saleAttributes) {
    this._sales.add(saleAttributes);
  }

  scan(lineAttributes) {
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
