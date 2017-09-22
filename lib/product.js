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
}

module.exports = {
  Product,
};
