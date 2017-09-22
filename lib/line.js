class Line {
  constructor(attributes) {
    this._sku = attributes.sku;
    this._product = attributes.product;
    this._qty = attributes.qty;
  }

  get sku() {
    return this._sku;
  }

  get product() {
    return this._product;
  }

  get qty() {
    return this._qty;
  }

  get total() {
    return this.product.perUnitPrice * this.qty;
  }
}

module.exports = {
  Line,
};
