const units = require('./units');
const { Products } = require('./products');
const { Bill } = require('./bill');

class Register {
  constructor() {
    this._products = new Products();
    this._bill = new Bill(this._products);
  }

  addProduct(productAttributes) {
    this._products.add(productAttributes);
  }

  scan(lineAttributes) {
    this._bill.add(lineAttributes);
  }

  get total() {
    return this._bill.total;
  }
}

module.exports = Object.assign({}, units, {
  Register,
});
