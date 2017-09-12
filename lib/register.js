const { Product, EACH, GRAMS, POUNDS, OUNCES } = require('./product');
const { Line } = require('./line');

class Register {
  constructor() {
    this._products = [];
    this._bill = [];
  }

  addProduct(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
  }

  scan(lineAttributes) {
    const line = new Line(lineAttributes);
    line.validate();
    this._bill.push(line);
  }
}

module.exports = {
  EACH,
  GRAMS,
  POUNDS,
  OUNCES,
  Register,
};
