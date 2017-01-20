function BaseRequest(provider, authToken) {
    this.Provider = provider;
    this.AuthorisationToken = authToken;
}

function BaseResponse(error) {
    this.Error = error;
}

module.exports = {
    BaseRequest,
    BaseResponse 
}
