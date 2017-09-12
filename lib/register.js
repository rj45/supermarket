const { Product, EACH, GRAMS, POUNDS, OUNCES } = require('./product');

class Register {
  constructor() {
    this._products = [];
  }

  addProduct(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
  }
}

module.exports = {
  EACH,
  GRAMS,
  POUNDS,
  OUNCES,
  Register,
};
