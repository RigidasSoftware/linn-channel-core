function BaseRequest() {
    this.AuthorisationToken = "";
}

function BaseResponse() {
    this.Error = null;
}

module.exports = {
    BaseRequest,
    BaseResponse 
}
