const { Product } = require('./product');

class Products {
  constructor() {
    this._products = Object.create(null);
  }

  add(productAttributes) {
    // TODO: not sure this should be here
    if (this.lookup(productAttributes.sku)) {
      throw new Error('product sku is already in use');
    }

    const product = new Product(productAttributes);
    product.validate();
    this._products[product.sku] = product;
  }

  lookup(sku) {
    return this._products[sku];
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
