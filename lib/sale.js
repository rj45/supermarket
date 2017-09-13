class Sale {
  constructor(attributes) {
    this._sku = attributes.sku;
    this._product = attributes.product;
  }

  get sku() {
    return this._sku;
  }

  get product() {
    return this._product;
  }

  validate() {
    if (!this.sku || typeof this.sku !== 'string') {
      throw new Error('sale sku is invalid');
    }

    if (!this.product) {
      throw new Error('could not find product');
    }
  }
}

class PriceSale extends Sale {
  constructor(attributes) {
    super(attributes);

    this._price = attributes.price;
  }

  get price() {
    return this._price;
  }

  discountFor(bill) {
    // TODO: this fails for things priced by qty, eg 2.99 for 100 g
    const discount = this.product.price - this.price;
    return bill.totalQtyOf(this.sku) * discount;
  }

  validate() {
    super.validate();

    if (
      (!this.price && this.price !== 0) ||
      !Number.isFinite(this.price) ||
      this.price < 0
    ) {
      throw new Error('sale price is invalid');
    }
  }
}

module.exports = {
  Sale,
  PriceSale,
};
