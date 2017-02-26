var base = require('./Base.js');

function Product(reference, sku, title, price, quantity) {
    this.Reference = reference;
    this.SKU = sku;
    this.Title = title;
    this.Price = price;
    this.Quantity = quantity;
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
        this.HasMorePages = hasMorePages || false;

        if(products && products.length > 0 && !(products[0] instanceof Product)){
            throw "products must be type of Product[]";
        }

        this.Products = products || [];
    }
    static error (error) {
        return new ProductsResponse(null, null, error);
    }
}

class ProductInventory {
    constructor(reference, sku, quantity) {
        this.Reference = reference;
        this.SKU = sku;
        this.Quantity = quantity;
    }
}

class ProductInventoryUpdateRequest extends base.BaseRequest {
    constructor(provider, authToken, products){
        super(provider, authToken);

        if(products && products.length > 0 && !(products[0] instanceof ProductInventory)){
            throw "products must be type of ProductInventory[]";
        }

        this.Products = products || [];
    } 
}

class ProductInventoryResponse extends base.BaseResponse {
    constructor(sku, error) {
        super(error);
        this.SKU = sku;
    }
}

class ProductInventoryUpdateResponse extends base.BaseResponse {
    constructor(products, error) {
        super(error);

        if(!error) {
            if(!products || products.length == 0){
                throw "products cannot be empty";
            }

            if(!(products[0] instanceof ProductInventoryResponse)){
                throw "products must be type of ProductInventoryResponse[]";
            }
        }

        this.Products = products || [];
    }
    static error (error) {
        return new ProductInventoryUpdateResponse(null, error);
    }
}

module.exports = {
    Product,
    ProductsRequest,
    ProductsResponse,
    ProductInventory,
    ProductInventoryUpdateRequest,
    ProductInventoryResponse,
    ProductInventoryUpdateResponse
};