const saleTypes = require('./sale');

class Sales {
  constructor(products) {
    this._products = products;
    this._sales = [];
  }

  add(saleAttributes) {
    const attributes = this._products.attributesWithProduct(saleAttributes);
    const SaleType = saleTypes[saleAttributes.type];
    const sale = new SaleType(attributes);
    this._sales.push(sale);
  }

  lookup(sku) {
    // TODO: this is not super efficient but done rarely so not fixing yet
    return this._sales.find(s => s.sku === sku);
  }

  totalDiscountFor(bill) {
    let discount = 0;
    this._sales.forEach(sale => {
      discount += sale.discountFor(bill);
    });
    return discount;
  }
}

module.exports = {
  Sales,
};
