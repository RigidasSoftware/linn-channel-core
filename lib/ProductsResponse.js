class ProductsResponse {
    constructor(hasMorePages, products) {
        this.HasMorePages = hasMorePages;
        this.Products = products || [];
    }
}

module.exports = ProductsResponse;