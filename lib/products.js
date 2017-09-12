const { Product } = require('./product');

class Products {
  constructor() {
    this._products = [];
  }

  add(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
  }

  lookup(sku) {
    // TODO: this is not very efficient, could use a map lookup
    return this._products.find(p => p.sku === sku);
  }

  attributesWithProduct(attributes) {
    const product = this.lookup(attributes.sku);
    return Object.assign({}, attributes, {
      product,
    });
  }
}

module.exports = {
  Products,
};