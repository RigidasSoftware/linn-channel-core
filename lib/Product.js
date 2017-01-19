function Product(reference, sku, title, price, quantity) {
    this.Reference = reference;
    this.SKU = sku;
    this.Title = title;
    this.Quantity = quantity;
    this.Price = price;
}

module.exports = Product;