const { Product } = require('./product');

class Products {
  constructor() {
    this._products = Object.create(null);
  }

  add(productAttributes) {
    const product = new Product(productAttributes);
    this._products[product.sku] = product;
  }

  lookup(sku) {
    return this._products[sku];
  }

  attributesWithProduct(attributes) {
    const product = this.lookup(attributes.sku);

    if (!product) {
      throw new Error('could not find product');
    }

    return Object.assign({}, attributes, {
      product,
    });
  }
}

module.exports = {
  Products,
};
