module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String
    }, {collection: "client.user"});

    return userSchema;
};
