var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Shipping = require('../lib/Shipping.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Shipping', function(){


    describe('ShippingTag', function() {

        it("constructor should set default properties", function() {

            var shippingTag = new Shipping.ShippingTag("ABC", "A B C", "DE");

            expect(shippingTag.Tag).to.equal("ABC");
            expect(shippingTag.FriendlyName).to.equal("A B C");
            expect(shippingTag.Site).to.equal("DE");
        });

    })

    describe('ShippingTagResponse', function() {

        it("constructor with success", function() {

            var shippingTags = [];
            shippingTags.push(new Shipping.ShippingTag("ABC", "A B C", "DE"));
            shippingTags.push(new Shipping.ShippingTag("ABA", "A A A", "UK"));

            var shippingTagResponse = new Shipping.ShippingTagResponse(shippingTags);

            expect(shippingTagResponse.ShippingTags).to.equal(shippingTags);
            expect(shippingTagResponse.Error).to.equal("");
        });

        it("constructor with error", function() {

            var shippingTagResponse = new Shipping.ShippingTagResponse(null, "I am an error");

            expect(shippingTagResponse.ShippingTags.length).to.equal(0);
            expect(shippingTagResponse.Error).to.equal("I am an error");
        });

    })

});
