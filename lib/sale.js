const { Validator } = require('./validator');

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
    new Validator(this, 'sale')
      .withField('sku')
      .notNull()
      .string()
      .notEmpty();

    // TODO: probably should not be here
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

    new Validator(this, 'price sale')
      .withField('price')
      .notNull()
      .number()
      .positive();
  }
}

module.exports = {
  Sale,
  PriceSale,
};
