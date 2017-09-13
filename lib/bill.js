const { Line } = require('./line');

class Bill {
  constructor(products) {
    this._products = products;
    this._lines = [];
  }

  add(lineAttributes) {
    const attributes = this._products.attributesWithProduct(lineAttributes);

    const line = new Line(attributes);
    line.validate();

    this._lines.push(line);
  }

  get total() {
    // TODO: for efficiency we could recalculate this only when a new line is added
    let total = 0;
    this._lines.forEach(line => {
      total += line.total;
    });

    return total;
  }

  totalQtyOf(sku) {
    let total = 0;
    this._lines.forEach(line => {
      if (line.sku === sku) {
        total += line.qty;
      }
    });
    return total;
  }
}

module.exports = {
  Bill,
};
