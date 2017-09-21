const { Validator } = require('./validator');

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

  validate() {
    const validator = new Validator(this, 'line');

    validator
      .withField('sku')
      .notNull()
      .string()
      .notEmpty();

    validator
      .withField('qty')
      .notNull()
      .number()
      .notZero()
      .positive();

    // TODO: probably should not be here
    if (!this.product) {
      throw new Error('could not find product');
    }
  }
}

module.exports = {
  Line,
};
