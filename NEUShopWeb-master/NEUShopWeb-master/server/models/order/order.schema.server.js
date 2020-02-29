module.exports = function () {
    var mongoose = require("mongoose");
    var orderSchema = mongoose.Schema({
        orderDateTime: Date,
        total : String,
        qty : [String],
        status : Boolean,
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'ClientUser'},
        product : [String]
    }, {collection: "order.user"});

    return orderSchema;
};