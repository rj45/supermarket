const { Product, EACH, GRAMS, POUNDS, OUNCES } = require('./product');
const { Line } = require('./line');

class Register {
  constructor() {
    this._products = [];
    // this._bill = [];
  }

  addProduct(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
  }

  scan(lineAttributes) {
    const attributesWithProduct = this._attributesWithProduct(lineAttributes);
    const line = new Line(attributesWithProduct);
    line.validate();
    // this._bill.push(line);
  }

  _attributesWithProduct(lineAttributes) {
    // TODO: not very efficient
    const product = this._products.find(p => p.sku === lineAttributes.sku);
    return Object.assign({}, lineAttributes, {
      product,
    });
  }
}

module.exports = {
  EACH,
  GRAMS,
  POUNDS,
  OUNCES,
  Register,
};
