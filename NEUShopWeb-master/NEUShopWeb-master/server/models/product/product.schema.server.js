module.exports = function () {
    var mongoose = require("mongoose");
    var productSchema = mongoose.Schema({
        productName: String,
        description: String,
        img: String,
        edition: String,
        color:String,
        styleNo:String,
        costPrice:String,
        sellingPrice:String
    }, {collection: "product.user"});

    return productSchema;
};
