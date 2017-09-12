const EACH = 'ea';
const VALID_UNITS = [EACH];

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

  validate() {
    if (!this.sku) {
      throw new Error('product sku is invalid');
    }

    if (!this.name) {
      throw new Error('product name is invalid');
    }

    if (!VALID_UNITS.includes(this.unit)) {
      throw new Error('product unit is invalid');
    }
  }
}

module.exports = {
  EACH,
  Product,
};
