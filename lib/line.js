const CENTS_PER_DOLLAR = 100;

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
    // TODO: money rounding might better be in a Money class
    return (
      Math.round(this.product.perUnitPrice * CENTS_PER_DOLLAR * this.qty) /
      CENTS_PER_DOLLAR
    );
  }

  validate() {
    if (!this.sku || typeof this.sku !== 'string') {
      throw new Error('line sku is invalid');
    }

    if (!this.product) {
      throw new Error('could not find product');
    }

    if (!this.qty || !Number.isFinite(this.qty) || this.qty < 0) {
      throw new Error('product qty is invalid');
    }
  }
}

module.exports = {
  Line,
};
