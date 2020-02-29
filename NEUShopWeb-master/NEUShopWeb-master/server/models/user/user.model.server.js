module.exports = function() {
    console.log("Hello from Mongoose!!");
    // var db = require('./database');
    var mongoose = require("mongoose");
    var q = require("q");
    //Getting the schema
    var userSchema = require("./user.schema.server.js")();
    //Creating the model of the mongodb
    var User = mongoose.model("ClientUser", userSchema);

    var api = {
        createUser : createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        deleteUser : deleteUser


    };
    return api;




    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update(
                {_id: userId},
                {$set: user}
            );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }


    // function createUser(users) {
    //
    //
    //
    //     var deferred = q.defer();
    //     User.create(users, function (err, doc) {
    //         if (err) {
    //             deferred.reject(err);
    //         }
    //         else {
    //             console.log(doc);
    //         }
    //     });
    //
    //     return deferred.promise;
    // }
    //
    // function findUserByUsername(userName) {
    //     var deferred = q.defer();
    //
    //     User.findOne(
    //         {"username": userName},
    //         function (err, status) {
    //             if (!err) {
    //                 console.log("model success" + userName);
    //                 console.log(status);
    //                 deferred.resolve(status);
    //
    //             }
    //             else {
    //                 deferred.reject(err);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function updateUser(currentUsername, userDetails) {
    //     var deferred = q.defer();
    //     User.update(
    //         {"username": currentUsername},
    //         {
    //             $set: {
    //                 //"username":userDetails.username,
    //                 "password": userDetails.password,
    //                 "firstname": userDetails.firstname,
    //                 "lastname": userDetails.lastname,
    //                 "email": userDetails.email
    //             }
    //         },
    //         function (err, stats) {
    //             if (!err) {
    //                 deferred.resolve(stats);
    //             }
    //             else {
    //                 deferred.reject(err);
    //             }
    //         });
    //     return deferred.promise;
    // }

};