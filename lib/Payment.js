var base = require('./Base.js');

class PaymentTag {
    constructor(tag, friendlyName, site) {
        this.Tag = tag;
        this.FriendlyName = friendlyName;
        this.Site = site;
    }
}

class PaymentTagResponse extends base.BaseResponse {
    constructor(paymentTags, error) {
        super(error);
        this.PaymentTags = paymentTags || [];
    }
}

module.exports = {
    PaymentTag,
    PaymentTagResponse
}