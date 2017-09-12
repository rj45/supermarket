const units = require('./units');
const { Products } = require('./products');
const { Line } = require('./line');

class Register {
  constructor() {
    this._products = new Products();
    this._bill = [];
  }

  addProduct(productAttributes) {
    this._products.add(productAttributes);
  }

  scan(lineAttributes) {
    // TODO: this does not belong here (probably need a Bill class)
    const attributesWithProduct = this._attributesWithProduct(lineAttributes);
    const line = new Line(attributesWithProduct);
    line.validate();
    this._bill.push(line);
  }

  get total() {
    // TODO: this does not belong here (should be on Bill)
    let total = 0;
    this._bill.forEach(line => {
      total += line.total;
    });

    return total;
  }

  _attributesWithProduct(lineAttributes) {
    // TODO: not very efficient, product lookup should be on Products not here
    const product = this._products.lookup(lineAttributes.sku);
    return Object.assign({}, lineAttributes, {
      product,
    });
  }
}

module.exports = Object.assign({}, units, {
  Register,
});
