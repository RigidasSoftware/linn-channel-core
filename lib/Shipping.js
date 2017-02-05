var base = require('./Base.js');

function ShippingTag(tag, friendlyName, site) {
    this.Tag = tag;
    this.FriendlyName = friendlyName;
    this.Site = site;
}

class ShippingTagResponse  extends base.BaseResponse {
    constructor(shippingTags, error) {
        super(error);
        this.ShippingTags = shippingTags || [];
    }
}

module.exports = {
    ShippingTag,
    ShippingTagResponse
}