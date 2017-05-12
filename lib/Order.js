var base = require('./Base.js');

const PaymentStatus = { 
    PAID: "PAID",
    UNPAID: "UNPAID",
    CANCELLED: "CANCELLED"
};

const DiscountType = {
    AllEvenly: "AllEvenly",
    ItemsThenPostage: "ItemsThenPostage",
    PostageThenItems: "PostageThenItems"
};

function Address(fullname, company, address1, address2, address3, town, region, postcode, country, countrycode, phonenumber, email){
    this.FullName = fullname;
    this.Company = company;
    this.Address1 = address1;
    this.Address2 = address2;
    this.Address3 = address3;
    this.Town = town;
    this.Region = region;
    this.PostCode = postcode;
    this.Country = country || "United Kingdom";
    this.CountryCode = countrycode || "UK";
    this.PhoneNumber = phonenumber;
    this.EmailAddress = email;
}

function OrderExtendedProperty(type, name, value) {

    if(!type) {
        throw 'Type must be provided';
    }

    if(!name){
        throw 'Name must be provided';
    }

    if(!value){
        throw 'Value must be provided';
    }

    this.Type = type;
    this.Name = name;
    this.Value = value;
}

function OrderItemOption(name, value) {

    if(!name){
        throw 'Name must be provided'
    }

    if(!value){
        throw 'Value must be provided';
    }

    this.Name = name;
    this.Value = value;
}

function OrderNote (note, username, date, internal){

    if(!note){
        throw 'Note must be provided';
    }

    if(!username){
        throw "NoteUserName must be provided";
    }

    this.Note = note;
    this.NoteEntryDate = date || new Date();
    this.NoteUserName = username;
    this.IsInternal = internal || false;
}

function OrderItem(lineNumber, sku, title, qty, price){

    if(!lineNumber){
        throw "OrderLineNumber must be provided";
    }
    if(!sku){
        throw "SKU must be provided";
    }


    this.TaxCostInclusive = true;
    this.UseChannelTax = false;
    this.IsService = false
    this.OrderLineNumber = lineNumber;
    this.SKU = sku;
    this.ItemTitle = title || "";
    this.PricePerUnit = price || 0;
    this.Qty = qty || 1;
    this.TaxRate = 0;
    this.LinePercentDiscount = 0;
    this.Options = []; //OrderItemOption

    this.SetOptions = function(options) {
        if(options && options.length > 0 && !(options[0] instanceof OrderItemOption)){
            throw "options must be type of OrderItemOption[]";
        }

        this.Options = options;
    }
}

function Order(referenceNum, paymentStatus, site, currency){

    if(!referenceNum){
        throw 'ReferenceNumber must be provided';
    }
    if(!paymentStatus){
        throw "PaymentStatus must be provided";
    }

    if(Object.keys(PaymentStatus).indexOf(paymentStatus) == -1){
        throw "PaymentStatus invalid";
    }

    this.ReferenceNumber = referenceNum.toString();
    this.ExternalReference = null;
    this.SecondaryReferenceNumber = null;
    this.Site = site || ""; //?
    this.Currency = currency || "GBP";
    
    this.PaymentStatus = paymentStatus; //PaymentStatus
    
    this.ChannelBuyerName = null;

    this.BillingAddress = new Address();
    this.DeliveryAddress = new Address();
    this.OrderItems = []; //OrderItem
    this.Notes = []; //OrderNote
    this.ExtendedProperties = []; //OrderExtendedProperty

    this.MatchPostalServiceTag = null;
    this.MatchPaymentMethodTag = null;

    this.ReceivedDate = this.DispatchBy = new Date();
    this.PaidOn = null;
    
    this.PostalServiceCost = 0;
    this.PostalServiceTaxRate = 0;
    this.Discount = 0;
    this.DiscountType = DiscountType.AllEvenly;
}

class OrdersRequest extends base.BaseRequest {
    constructor(provider, authToken, utcTimeFrom, pageNumber) {
        super(provider, authToken);
        if(utcTimeFrom) {
            this.UTCTimeFrom = utcTimeFrom;
        }
        else{
            this.UTCTimeFrom = new Date();
            this.UTCTimeFrom = new Date(this.UTCTimeFrom.setUTCHours(this.UTCTimeFrom.getUTCHours() -168));
        }
        this.PageNumber = pageNumber || 1;
    }
}

class OrdersResponse extends base.BaseResponse {
    constructor(hasMorePages, orders, error) {
        super(error);
        this.HasMorePages = hasMorePages || false;

        if(orders && orders.length > 0 && !(orders[0] instanceof Order)){
            throw "orders must be type of Order[]";
        }

        this.Orders = orders || [];
    }
    static error (error) {
        return new OrdersResponse(null, null, error);
    }
}

class OrderDespatchItem {
    constructor(sku, lineNumber, despatchedQuantity){
        this.SKU = sku || "";
        this.OrderLineNumber = lineNumber || 0;
        this.DespatchedQuantity = despatchedQuantity || 1;
    }
}

class OrderDespatch {
    constructor (referenceNumber, shippingVendor, shippingMethod, tracking, secondaryTracking, processedOn, items){
        this.ReferenceNumber = referenceNumber || "";
        this.ShippingVendor = shippingVendor || "";
        this.ShippingMethod = shippingMethod || "";
        this.TrackingNumber = tracking || "";
        this.SecondaryTrackingNumbers = secondaryTracking || [];
        this.ProcessedOn = processedOn || new Date();

        if(items && items.length > 0 && !(items[0] instanceof OrderDespatchItem)){
            throw "items must be type of OrderDespatchItem[]";
        }

        this.Items = items || [];
    }
}

class OrderDespatchError extends base.BaseResponse {
    constructor(reference, error){
        super(error);
        this.ReferenceNumber = reference || "";
    }
    static error (error) {
        return new OrderDespatchError(null, error);
    }
}

class OrderDespatchRequest extends base.BaseRequest {
    constructor(provider, authToken, orders){
        super(provider, authToken);
        this.Orders = orders || [];
    }
}

class OrderDespatchResponse extends base.BaseResponse {
    constructor(orders, error){
        super(error);

        if(orders && orders.length > 0 && !(orders[0] instanceof OrderDespatchError)){
            throw "orders must be type of OrderDespatchError[]";
        }

        this.Orders = orders || [];
    }
}

module.exports = {
    PaymentStatus,
    DiscountType,
    Address,
    OrderExtendedProperty,
    OrderItemOption,
    OrderNote,
    OrderItem,
    Order,
    OrdersRequest,
    OrdersResponse,
    OrderDespatchItem,
    OrderDespatch,
    OrderDespatchError,
    OrderDespatchRequest,
    OrderDespatchResponse
}