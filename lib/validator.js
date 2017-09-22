const units = require('./units');

// get a list of units values
const VALID_UNITS = Object.keys(units).map(u => units[u]);

class ProductValidator {
  constructor(collection) {
    this._collection = collection;
  }

  assertValid(attributes) {
    const validator = new Validator(this._collection, attributes, 'product');

    validator
      .withField('sku')
      .notNull()
      .string()
      .notEmpty()
      .unique();

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

class LineValidator {
  constructor(collection) {
    this._collection = collection;
  }

  assertValid(attributes) {
    const validator = new Validator(this._collection, attributes, 'line');

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
  }
}

class SaleValidator {
  constructor(collection) {
    this._collection = collection;
  }

  assertValid(attributes) {
    const validator = new Validator(this._collection, attributes, 'sale');

    validator
      .withField('sku')
      .notNull()
      .string()
      .notEmpty()
      .unique();

    validator
      .withField('type')
      .notNull()
      .string()
      .notEmpty();

    // TODO: really don't like having to add new sale types here... not sure
    // how to fix this
    switch (attributes.type) {
      case 'PriceSale':
        this._assertValidPriceSale(validator);
        break;

      default:
        throw new Error('sale type not found');
    }
  }

  _assertValidPriceSale(validator) {
    validator
      .withField('price')
      .notNull()
      .number()
      .positive();
  }
}

class Validator {
  constructor(collection, attributes, name) {
    this._collection = collection;
    this._attributes = attributes;
    this._name = name;
  }

  withField(name) {
    this._field = name;
    return this;
  }

  get field() {
    return this._field;
  }

  get value() {
    return this._attributes[this._field];
  }

  unique() {
    return this._check('already in use', v => this._collection.lookup(v));
  }

  notNull() {
    return this._check('null', v => v == null);
  }

  notEmpty() {
    return this._check('empty', v => !v.length);
  }

  notZero() {
    return this._check('zero', v => v === 0);
  }

  positive() {
    return this._check('negative', v => v < 0);
  }

  string() {
    return this._check('not a string', v => typeof v !== 'string');
  }

  number() {
    return this._check('not a number', v => !Number.isFinite(v));
  }

  includedIn(validValues) {
    return this._check('invalid', v => !validValues.includes(v));
  }

  _check(problem, test) {
    if (test(this.value)) {
      throw new Error(`${this._name} ${this.field} is ${problem}`);
    }
    return this;
  }
}

module.exports = {
  ProductValidator,
  LineValidator,
  SaleValidator,
  Validator,
};
