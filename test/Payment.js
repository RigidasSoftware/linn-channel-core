var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Payment = require('../lib/Payment.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Payment', function(){


    describe('PaymentTag', function() {

        it("constructor should set default properties", function() {

            var paymentTag = new Payment.PaymentTag("ABC", "A B C", "DE");

            expect(paymentTag.Tag).to.equal("ABC");
            expect(paymentTag.FriendlyName).to.equal("A B C");
            expect(paymentTag.Site).to.equal("DE");
        });

    })

    describe('PaymentTagResponse', function() {

        it("constructor with success", function() {

            var paymentTags = [];
            paymentTags.push(new Payment.PaymentTag("ABC", "A B C", "DE"));
            paymentTags.push(new Payment.PaymentTag("ABA", "A A A", "UK"));

            var paymentTagResponse = new Payment.PaymentTagResponse(paymentTags);

            expect(paymentTagResponse.PaymentTags).to.equal(paymentTags);
            expect(paymentTagResponse.Error).to.equal("");
        });

        it("constructor with error", function() {

            var paymentTagResponse = new Payment.PaymentTagResponse(null, "I am an error");

            expect(paymentTagResponse.PaymentTags.length).to.equal(0);
            expect(paymentTagResponse.Error).to.equal("I am an error");
        });

    })

});
