const { Product, EACH, GRAMS, POUNDS, OUNCES } = require('./product');
const { Line } = require('./line');

class Register {
  constructor() {
    this._products = [];
    this._bill = [];
  }

  addProduct(productAttributes) {
    // TODO: this does not belong here (probably need a Products class)
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
  }

  scan(lineAttributes) {
    // TODO: this does not belong here (probably need a Bill class)
    const attributesWithProduct = this._attributesWithProduct(lineAttributes);
    const line = new Line(attributesWithProduct);
    line.validate();
    this._bill.push(line);
  }

  get total() {
    // TODO: this does not belong here (should be on Bill)
    let total = 0;
    this._bill.forEach(line => {
      total += line.total;
    });

    return total;
  }

  _attributesWithProduct(lineAttributes) {
    // TODO: not very efficient, product lookup should be on Products not here
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
