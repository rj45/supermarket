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

class XForYSale extends Sale {
  constructor(attributes) {
    super(attributes);

    this._minQty = attributes.minQty;
    this._priceQty = attributes.priceQty;
  }

  get minQty() {
    return this._minQty;
  }

  get priceQty() {
    return this._priceQty;
  }

  discountFor(bill) {
    const qty = bill.totalQtyOf(this.sku);
    if (qty < this.minQty) {
      return 0;
    }

    const discountPrice = this.product.price * this.priceQty / this.minQty;
    const discount = (this.product.price - discountPrice) / this.product.qty;
    return qty * discount;
  }
}

module.exports = {
  PriceSale,
  XForYSale,
};
