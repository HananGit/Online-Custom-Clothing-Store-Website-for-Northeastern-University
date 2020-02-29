module.exports = function() {

    console.log("hello to order");

    var mongoose = require("mongoose");
    var ObjectId = require('mongodb').ObjectID;
    var q = require("q");

    //Getting the schema
    var orderSchema = require("./order.schema.server.js")();

    //Creating the model of the mongodb
    var Order = mongoose.model("OrderUser", orderSchema);

    var api = {
        getUserOrders : getUserOrders,
        cancelUserOrder : cancelUserOrder,
        saveUserOrder: saveUserOrder
    };
    return api;


function createOrder(order){
    // var user = {user:userId}
    console.log(order);
    return Order.create(order);
}

    function saveUserOrder(order) {
        // var splitproduct = productId.split(",")

        var deferred = q.defer();
        var orderdetails ={
            orderDateTime : order.orderDateTime,
            total : order.total,
            user : order.user,
            status : 1
        }

        createOrder(orderdetails)
            .then(function (orderdetail) {
                Order
                    .findById(orderdetail._id, function(err,orderdetail){
                        if(err) {

                            deferred.abort(err);

                        } else {

                            for (var i = 0; i < order.product.length; i++) {

                                orderdetail.product.push(JSON.stringify(order.product[i]));

                            }
                            orderdetail.save();
                            deferred.resolve(order);
                        }
            })
    })
        return deferred.promise;
    }


    function getUserOrders(userId) {
        var deferred = q.defer();
            Order
                .find({user:userId}, function (err, order) {
                    if(err) {
                        deferred.abort(err);
                    } else
                        {
                          deferred.resolve(order);
                        }
               })
    return deferred.promise;
    }

    function cancelUserOrder(orderId) {

        var deferred = q.defer();
        Order
            .findById(orderId, function(err,orderdetail){
                if(err) {

                    deferred.abort(err);

                } else {

                   orderdetail.status = 0;
                    orderdetail.save();
                    deferred.resolve("Cancelled");
                }
            });
        return deferred.promise;
    }






};