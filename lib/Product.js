var base = require('./Base.js');

function Product(reference, sku, title, price, quantity) {
    this.Reference = reference;
    this.SKU = sku;
    this.Title = title;
    this.Quantity = quantity;
    this.Price = price;
}

class ProductsRequest extends base.BaseRequest {
    constructor(provider, authToken, pageNumber) {
        super(provider, authToken);
        this.PageNumber = pageNumber || 1;
    }
}

class ProductsResponse extends base.BaseResponse {
    constructor(hasMorePages, products, error) {
        super(error);
        this.HasMorePages = hasMorePages;
        this.Products = products || [];
    }
    static error (error) {
        return new ProductsResponse(null, null, error);
    }
}

module.exports = {
    Product,
    ProductsRequest,
    ProductsResponse
};