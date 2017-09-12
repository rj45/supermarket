const { Line } = require('./line');

class Bill {
  constructor(products) {
    this._products = products;
    this._lines = [];
  }

  add(lineAttributes) {
    const attributesWithProduct = this._attributesWithProduct(lineAttributes);
    const line = new Line(attributesWithProduct);
    line.validate();
    this._lines.push(line);
  }

  get total() {
    let total = 0;
    this._lines.forEach(line => {
      total += line.total;
    });

    return total;
  }

  _attributesWithProduct(lineAttributes) {
    const product = this._products.lookup(lineAttributes.sku);
    return Object.assign({}, lineAttributes, {
      product,
    });
  }
}

module.exports = {
  Bill,
};
