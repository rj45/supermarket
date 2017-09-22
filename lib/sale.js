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
    const discount = (this.product.price - this.price) / this.product.qty;
    return bill.totalQtyOf(this.sku) * discount;
  }
}

module.exports = {
  Sale,
  PriceSale,
};
