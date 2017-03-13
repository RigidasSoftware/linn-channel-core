var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Product = require('../lib/Product.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Product', function(){


    describe('Product', function() {

        it("constructor should set properties", function() {

            var product = new Product.Product("ref|opt", "sku1", "i am a title", 8.92, 74);

            expect(product.Reference).to.equal("ref|opt");
            expect(product.SKU).to.equal("sku1");
            expect(product.Title).to.equal("i am a title");
            expect(product.Quantity).to.equal(74);
            expect(product.Price).to.equal(8.92);
        });
    })

    describe('ProductsRequest', function() {

        it("constructor should set properties", function() {

            var productsRequest = new Product.ProductsRequest("create", "token1", 7);

            expect(productsRequest.Provider).to.equal("create");
            expect(productsRequest.AuthorizationToken).to.equal("token1");
            expect(productsRequest.PageNumber).to.equal(7);
        });
    })

     describe('ProductsResponse', function() {

          it("constructor should complain about products type", function() {

             var products = [
                new Product.ProductInventoryResponse("sku1")
            ]

            try {
                new Product.ProductsResponse(true, products);
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("products must be type of Product[]");
            }

        });

        it("constructor should set default properties", function() {

            var productsResponse = new Product.ProductsResponse();

            expect(productsResponse.Error).to.equal("");
            expect(productsResponse.HasMorePages).to.equal(false);
            expect(productsResponse.Products.length).to.equal(0);
        });

        it("constructor with success", function() {

            var products = [
                new Product.Product("ref|opt", "sku1", "i am a title", 8.92, 74)
            ];

            var productsResponse = new Product.ProductsResponse(true, products);

            expect(productsResponse.Error).to.equal("");
            expect(productsResponse.HasMorePages).to.equal(true);
            expect(productsResponse.Products).to.equal(products);
        });

        it("constructor with error", function() {

            var productsResponse = new Product.ProductsResponse(null, null, "i am broke");

            expect(productsResponse.Error).to.equal("i am broke");
            expect(productsResponse.HasMorePages).to.equal(false);
            expect(productsResponse.Products.length).to.equal(0);
        });

         describe('error', function() {
            it("should return an error result", function() {

                var productsResponse = Product.ProductsResponse.error("i am broke");

                expect(productsResponse.Error).to.equal("i am broke");
                expect(productsResponse.HasMorePages).to.equal(false);
                expect(productsResponse.Products.length).to.equal(0);
            });
         });
    })


    describe('ProductInventory', function() {

        it("constructor should set properties", function() {

            var productsRequest = new Product.ProductInventory("prod|opt", "sku1", 5);

            expect(productsRequest.Reference).to.equal("prod|opt");
            expect(productsRequest.SKU).to.equal("sku1");
            expect(productsRequest.Quantity).to.equal(5);

        });
    })

    describe('ProductInventoryUpdateRequest', function() {

        it("constructor should complain about products type", function() {

             var products = [
                new Product.ProductInventoryResponse("sku1"),
                new Product.ProductInventoryResponse("sku2")
            ]

            try {
                var updateRequest = new Product.ProductInventoryUpdateRequest("create", "token1", products);
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("products must be type of ProductInventory[]");
            }

        });

        it("constructor should set properties", function() {

            var products = [
                new Product.ProductInventory("prod|a","sku1", 75),
                new Product.ProductInventory("prod|b","sku2", 1)
            ]
            var updateRequest = new Product.ProductInventoryUpdateRequest("create", "token1", products);

            expect(updateRequest.Provider).to.equal("create");
            expect(updateRequest.AuthorizationToken).to.equal("token1");
            expect(updateRequest.Products).to.equal(products);
        });
    })

    describe('ProductInventoryResponse', function() {

        it("constructor should set properties", function() {

            var ProductInventoryResponse = new Product.ProductInventoryResponse("sku1", "i am broke");

            expect(ProductInventoryResponse.Error).to.equal("i am broke");
            expect(ProductInventoryResponse.SKU).to.equal("sku1");
        });
    });

    describe('ProductInventoryUpdateResponse', function() {

        it("constructor should complain about null products", function() {

            try {
                var updateResponse = new Product.ProductInventoryUpdateResponse();
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("products cannot be empty");
            }

        });

        it("constructor should complain about empty products", function() {

            try {
                var updateResponse = new Product.ProductInventoryUpdateResponse([]);
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("products cannot be empty");
            }

        });

        it("constructor should complain about products type", function() {

             var products = [
                new Product.ProductInventory("sku1", 75),
                new Product.ProductInventory("sku2", 1)
            ]

            try {
                var updateResponse = new Product.ProductInventoryUpdateResponse(products);
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("products must be type of ProductInventoryResponse[]");
            }

        });

        it("constructor should set properties", function() {

            var products = [
                new Product.ProductInventoryResponse("sku1"),
                new Product.ProductInventoryResponse("sku2")
            ]
            var updateResponse = new Product.ProductInventoryUpdateResponse(products, "it broke");

            expect(updateResponse.Products).to.equal(products);
            expect(updateResponse.Error).to.equal("it broke");
        });

        describe('error', function() {
            it("should return an error result", function() {

                var productsResponse = Product.ProductInventoryUpdateResponse.error("i am broke");

                expect(productsResponse.Error).to.equal("i am broke");
                expect(productsResponse.Products.length).to.equal(0);
            });
         });
    })
});
