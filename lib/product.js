const units = require('./units');

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
    // not sure about this typeof check... would like some sort of "seems like a string"
    if (!this.sku || typeof this.sku !== 'string') {
      throw new Error('product sku is invalid');
    }

    if (!this.name || typeof this.name !== 'string') {
      throw new Error('product name is invalid');
    }

    // TODO: potentially slow if many units, for now this is okay
    if (!VALID_UNITS.includes(this.unit)) {
      throw new Error('product unit is invalid');
    }

    if (!this.qty || !Number.isFinite(this.qty) || this.qty < 0) {
      throw new Error('product qty is invalid');
    }

    if (!this.price || !Number.isFinite(this.price) || this.price < 0) {
      throw new Error('product price is invalid');
    }
  }
}

module.exports = {
  Product,
};
