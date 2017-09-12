const { Product, EACH } = require('./product');

class Register {
  addProduct(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
  }
}

module.exports = {
  EACH,
  Register,
};
