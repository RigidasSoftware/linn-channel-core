function Product(reference, sku, title, price, quantity) {
    this.Reference = reference;
    this.SKU = sku;
    this.Title = title;
    this.Quantity = quantity;
    this.Price = price;
}

class ProductsResponse {
    constructor(hasMorePages, products) {
        this.HasMorePages = hasMorePages;
        this.Products = products || [];
    }
}

module.exports = {
    Product,
    ProductsResponse
};