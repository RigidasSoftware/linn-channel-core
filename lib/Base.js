function BaseRequest() {
    AuthorisationToken = "";
}

function BaseResponse() {
    Error = null;
}

module.exports = {
    BaseRequest,
    BaseResponse 
}
