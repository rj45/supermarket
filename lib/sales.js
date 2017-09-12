const saleTypes = require('./sale');

class Sales {
  constructor(products) {
    this._products = products;
    this._sales = [];
  }

  add(saleAttributes) {
    const attributes = this._products.attributesWithProduct(saleAttributes);
    const SaleType = saleTypes[attributes.type];
    if (!SaleType) {
      throw new Error('sale type not found');
    }
    const sale = new SaleType(attributes);
    sale.validate();
    this._sales.push(sale);
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
