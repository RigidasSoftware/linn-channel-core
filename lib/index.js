var base = require('./Base'),
    config = require('./Config'),
    product = require('./Product');

exports.BaseRequest = base.BaseRequest;
exports.BaseResponse = base.BaseResponse;
exports.AddNewUserRequest = config.AddNewUserRequest;
exports.AddNewUserResponse = config.AddNewUserResponse;
exports.SaveUserConfigRequest = config.SaveUserConfigRequest;
exports.UserConfigResponse = config.UserConfigResponse;
exports.Product = product.Product;
exports.ProductsResponse = product.ProductsResponse;