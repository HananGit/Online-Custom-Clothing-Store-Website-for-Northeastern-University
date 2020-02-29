module.exports = function () {


    var models = {
        userModelProject : require("./user/user.model.server")(),
        productModelProject: require("./product/product.model.server")(),
        orderModelProject : require("./order/order.model.server")()
    };

    return models;
};