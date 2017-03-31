var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Order = require('../lib/Order.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Order', function(){

    describe('PaymentStatus', function() {

        it("Check values are correct", function() {
            expect(Order.PaymentStatus.PAID).to.equal("PAID");
            expect(Order.PaymentStatus.UNPAID).to.equal("UNPAID");
            expect(Order.PaymentStatus.CANCELLED).to.equal("CANCELLED");
        });
    })

    describe('DiscountType', function() {

        it("Check values are correct", function() {
            expect(Order.DiscountType.AllEvenly).to.equal("AllEvenly");
            expect(Order.DiscountType.ItemsThenPostage).to.equal("ItemsThenPostage");
            expect(Order.DiscountType.PostageThenItems).to.equal("PostageThenItems");
        });
    })

    describe('Address', function() {

        it("constructor should set default properties", function() {

            var address = new Order.Address();

            expect(address.FullName).to.equal(undefined);
            expect(address.Company).to.equal(undefined);
            expect(address.Address1).to.equal(undefined);
            expect(address.Address2).to.equal(undefined);
            expect(address.Address3).to.equal(undefined);
            expect(address.Town).to.equal(undefined);
            expect(address.Region).to.equal(undefined);
            expect(address.PostCode).to.equal(undefined);
            expect(address.Country).to.equal("United Kingdom");
            expect(address.CountryCode).to.equal("UK");
            expect(address.PhoneNumber).to.equal(undefined);
            expect(address.EmailAddress).to.equal(undefined);            
        });

        it("constructor should set properties", function() {

            var address = new Order.Address("a man", "rigidas software", "five houses", "long road", "copse bridge", "tiny town", "region of doom", "RI7 7HS", "Knights Kingdom", "KK", "0722813740", "long@email.com");

            expect(address.FullName).to.equal("a man");
            expect(address.Company).to.equal("rigidas software");
            expect(address.Address1).to.equal("five houses");
            expect(address.Address2).to.equal("long road");
            expect(address.Address3).to.equal("copse bridge");
            expect(address.Town).to.equal("tiny town");
            expect(address.Region).to.equal("region of doom");
            expect(address.PostCode).to.equal("RI7 7HS");
            expect(address.Country).to.equal("Knights Kingdom");
            expect(address.CountryCode).to.equal("KK");
            expect(address.PhoneNumber).to.equal("0722813740");
            expect(address.EmailAddress).to.equal("long@email.com");
        });
    })

    describe('OrderExtendedProperty', function() {

        it("constructor should set properties", function() {

            var property = new Order.OrderExtendedProperty('mytype', 'myname', 'myvalue');

            expect(property.Type).to.equal('mytype');
            expect(property.Name).to.equal('myname');
            expect(property.Value).to.equal('myvalue');
            
        });

        it("constructor should throw errors", function() {

            function checkNullErrors(expectedMessage, type, name, value){
                try {
                    new Order.OrderExtendedProperty(type, name, value);
                    throw 'should not hit here';
                }
                catch (e){
                    expect(e).to.equal(expectedMessage);
                }
            }

            checkNullErrors('Type must be provided');
            checkNullErrors('Name must be provided', 'mytype');
            checkNullErrors('Value must be provided', 'mytype', 'myname');
            
        });
    });

    describe('OrderItemOption', function() {

        it("constructor should set properties", function() {

            var option = new Order.OrderItemOption('myname', 'myvalue');

            expect(option.Name).to.equal('myname');
            expect(option.Value).to.equal('myvalue');
            
        });

        it("constructor should throw errors", function() {

            function checkNullErrors(expectedMessage, name, value){
                try {
                    new Order.OrderItemOption(name, value);
                    throw 'should not hit here';
                }
                catch (e){
                    expect(e).to.equal(expectedMessage);
                }
            }

            checkNullErrors('Name must be provided');
            checkNullErrors('Value must be provided', 'myname');
            
        });
    });

    describe('OrderNote', function() {

        it("constructor should set properties", function() {

            var date = new Date('2017/01/05 17:12:48');
            var option = new Order.OrderNote('note', 'myuser', date, true);

            expect(option.Note).to.equal('note');
            expect(option.NoteEntryDate).to.equal(date);
            expect(option.NoteUserName).to.equal('myuser');
            expect(option.IsInternal).to.equal(true);
            
        });

        it("constructor should throw errors", function() {

            function checkNullErrors(expectedMessage, note, username){
                try {
                    new Order.OrderNote(note, username);
                    throw 'should not hit here';
                }
                catch (e){
                    expect(e).to.equal(expectedMessage);
                }
            }

            checkNullErrors('Note must be provided');
            checkNullErrors('NoteUserName must be provided', 'a note');
            
        });

        it("constructor should set default properties", function() {

            var option = new Order.OrderNote('note', 'myuser');

            expect(option.Note).to.equal('note');
            expect(option.NoteEntryDate).to.be.instanceOf(Date);
            expect(option.NoteUserName).to.equal('myuser');
            expect(option.IsInternal).to.equal(false);
            
        });
    });

    describe('OrderItem', function() {

        it("constructor should set properties", function() {

            var item = new Order.OrderItem(7, 'sku71', 'a title I am', 38, 15.67);

            expect(item.OrderLineNumber).to.equal(7);
            expect(item.SKU).to.equal("sku71");
            expect(item.ItemTitle).to.equal('a title I am');
            expect(item.Qty).to.equal(38);
            expect(item.PricePerUnit).to.equal(15.67);
            
        });

        it("constructor should throw errors", function() {

            function checkNullErrors(expectedMessage, lineNumber, sku){
                try {
                    new Order.OrderItem(lineNumber, sku);
                    throw 'should not hit here';
                }
                catch (e){
                    expect(e).to.equal(expectedMessage);
                }
            }

            checkNullErrors('OrderLineNumber must be provided');
            checkNullErrors('SKU must be provided', 7);
            
        });

        it("constructor should set default properties", function() {

            var item = new Order.OrderItem(5, "some sku");

            expect(item.TaxCostInclusive).to.equal(true);
            expect(item.UseChannelTax).to.equal(false);
            expect(item.IsService).to.equal(false);
            expect(item.OrderLineNumber).to.equal(5);
            expect(item.SKU).to.equal("some sku");
            expect(item.ItemTitle).to.equal('');
            expect(item.PricePerUnit).to.equal(0);
            expect(item.Qty).to.equal(1);
            expect(item.TaxRate).to.equal(0);
            expect(item.LinePercentDiscount).to.equal(0);
            expect(item.Options.length).to.equal(0);
            
        });

        describe('SetOptions', function() {
            
            it("should set options", function() {
                var item = new Order.OrderItem(5, "some sku");

                var options = [
                    new Order.OrderItemOption('colour', 'red'),
                    new Order.OrderItemOption('size', 'large')
                ]

                item.SetOptions(options);

                expect(item.Options).to.equal(options);
                
            });

            it("should complain about type", function() {
                var item = new Order.OrderItem(5, "some sku");

                var options = [
                    new Order.OrderNote('note','user1','')
                ]

                try {
                    item.SetOptions(options);
                    throw "should not hit here";
                }
                catch(ex){
                    expect(ex).to.equal("options must be type of OrderItemOption[]");
                }
            });
        });
    });

    describe('Order', function() {

        it("constructor should set properties", function() {

            var order = new Order.Order(1234, Order.PaymentStatus.UNPAID, "ES", "USD");

            expect(order.ReferenceNumber).to.equal("1234");
            expect(order.PaymentStatus).to.equal(Order.PaymentStatus.UNPAID);
            expect(order.Site).to.equal('ES');
            expect(order.Currency).to.equal('USD');            
        });

        it("constructor should throw errors", function() {

            function checkNullErrors(expectedMessage, referenceNum, paymentStatus){
                try {
                    new Order.Order(referenceNum, paymentStatus);
                    throw 'should not hit here';
                }
                catch (e){
                    expect(e).to.equal(expectedMessage);
                }
            }

            
            checkNullErrors('ReferenceNumber must be provided');
            checkNullErrors('PaymentStatus must be provided', 'abcd1');
            checkNullErrors('PaymentStatus invalid', 'abcd1', 'refunded');
            
        });

        it("constructor should set default properties", function() {

            var order = new Order.Order("ref7", Order.PaymentStatus.PAID);

            expect(order.Site).to.equal("");
            expect(order.BillingAddress).to.be.instanceOf(Order.Address);
            expect(order.DeliveryAddress).to.be.instanceOf(Order.Address);
            expect(order.OrderItems.length).to.equal(0);
            expect(order.Notes.length).to.equal(0);
            expect(order.ExtendedProperties.length).to.equal(0);
            expect(order.MatchPostalServiceTag).to.equal(null);
            expect(order.MatchPaymentMethodTag).to.equal(null);
            expect(order.PaymentStatus).to.equal(Order.PaymentStatus.PAID);
            expect(order.ChannelBuyerName).to.equal(null);
            expect(order.ExternalReference).to.equal(null);
            expect(order.SecondaryReferenceNumber).to.equal(null);
            expect(order.Currency).to.equal('GBP');
            expect(order.ReceivedDate).to.be.instanceOf(Date);
            expect(order.DispatchBy).to.be.instanceOf(Date);
            expect(order.PaidOn).to.equal(null);
            expect(order.PostalServiceCost).to.equal(0);
            expect(order.PostalServiceTaxRate).to.equal(0);
            expect(order.Discount).to.equal(0);
            expect(order.DiscountType).to.equal(Order.DiscountType.AllEvenly);            
        });
    });

    describe('OrdersRequest', function() {

        it("constructor should set properties", function() {

            var date = new Date('2017/08/03 18:12:43');
            var ordersRequest = new Order.OrdersRequest("create", "token1",date, 7);

            expect(ordersRequest.Provider).to.equal("create");
            expect(ordersRequest.AuthorizationToken).to.equal("token1");
            expect(ordersRequest.UTCTimeFrom).to.equal(date);
            expect(ordersRequest.PageNumber).to.equal(7);
        });

        it("constructor should set default properties", function() {

            var ordersRequest = new Order.OrdersRequest("create", "token1");

            expect(ordersRequest.UTCTimeFrom).to.be.instanceOf(Date);
            var diff = new Date() - ordersRequest.UTCTimeFrom;
            expect(diff).to.be.greaterThan(518400000);
            expect(diff).to.be.lessThan(613440000);
            expect(ordersRequest.PageNumber).to.equal(1);
        });
    })

    describe('OrdersResponse', function() {

          it("constructor should complain about orders type", function() {

            var orders = [
                new Order.OrdersResponse("sku1")
            ]

            try {
                new Order.OrdersResponse(true, orders);
                throw "should not hit here";
            }
            catch(ex){
                expect(ex).to.equal("orders must be type of Order[]");
            }

        });

        it("constructor should set default properties", function() {

            var ordersResponse = new Order.OrdersResponse();

            expect(ordersResponse.Error).to.equal("");
            expect(ordersResponse.HasMorePages).to.equal(false);
            expect(ordersResponse.Orders.length).to.equal(0);
        });

        it("constructor with success", function() {

            var orders = [
                new Order.Order("ref7", Order.PaymentStatus.PAID, "ES", "GBP")
            ];

            var ordersResponse = new Order.OrdersResponse(true, orders);

            expect(ordersResponse.Error).to.equal("");
            expect(ordersResponse.HasMorePages).to.equal(true);
            expect(ordersResponse.Orders).to.equal(orders);
        });

        it("constructor with error", function() {

            var ordersResponse = new Order.OrdersResponse(null, null, "i am broke");

            expect(ordersResponse.Error).to.equal("i am broke");
            expect(ordersResponse.HasMorePages).to.equal(false);
            expect(ordersResponse.Orders.length).to.equal(0);
        });

         describe('error', function() {
            it("should return an error result", function() {

                var ordersResponse = Order.OrdersResponse.error("i am broke");

                expect(ordersResponse.Error).to.equal("i am broke");
                expect(ordersResponse.HasMorePages).to.equal(false);
                expect(ordersResponse.Orders.length).to.equal(0);
            });
         });
    })
});