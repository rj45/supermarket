const units = require('./units');
const { Validator } = require('./validator');

// get a list of units values
const VALID_UNITS = Object.keys(units).map(u => units[u]);

class Product {
  constructor(attributes) {
    this._sku = attributes.sku;
    this._name = attributes.name;
    this._unit = attributes.unit;
    this._qty = attributes.qty;
    this._price = attributes.price;
  }

  get sku() {
    return this._sku;
  }

  get name() {
    return this._name;
  }

  get unit() {
    return this._unit;
  }

  get qty() {
    return this._qty;
  }

  get price() {
    return this._price;
  }

  get perUnitPrice() {
    return this.price / this.qty;
  }

  validate() {
    const validator = new Validator(this, 'product');

    validator
      .withField('sku')
      .notNull()
      .string()
      .notEmpty();

    validator
      .withField('name')
      .notNull()
      .string()
      .notEmpty();

    validator
      .withField('unit')
      .notNull()
      .string()
      .includedIn(VALID_UNITS);

    validator
      .withField('qty')
      .notNull()
      .number()
      .notZero()
      .positive();

    validator
      .withField('price')
      .notNull()
      .number()
      .notZero()
      .positive();
  }
}

module.exports = {
  Product,
};
