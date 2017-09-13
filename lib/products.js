const { Product } = require('./product');

class Products {
  constructor() {
    this._products = [];
    this._index = Object.create(null);
  }

  add(productAttributes) {
    const product = new Product(productAttributes);
    product.validate();
    this._products.push(product);
    this._index[product.sku] = product;
  }

  lookup(sku) {
    return this._index[sku];
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
