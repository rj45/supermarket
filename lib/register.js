const { Product, EACH } = require('./product');

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
  Register,
};
