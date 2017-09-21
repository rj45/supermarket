const saleTypes = require('./sale');

class Sales {
  constructor(products) {
    this._products = products;
    this._sales = [];
  }

  add(saleAttributes) {
    // TODO: not sure this should be here
    if (this.lookup(saleAttributes.sku)) {
      throw new Error('sale sku already has sale applied');
    }

    const attributes = this._products.attributesWithProduct(saleAttributes);
    const SaleType = getSaleType();
    const sale = new SaleType(attributes);
    sale.validate();
    this._sales.push(sale);

    function getSaleType() {
      const Sale = saleTypes[saleAttributes.type];
      if (!Sale) {
        throw new Error('sale type not found');
      }
      return Sale;
    }
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
