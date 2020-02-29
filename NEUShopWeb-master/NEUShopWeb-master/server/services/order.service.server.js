

module.exports = function (app, models) {
    var orderModelProject = models.orderModelProject;


    app.get('/api/project/userOrders', getUserOrders);
    app.post("/api/project/saveUserOrder",saveUserOrder);
    app.post("/api/project/cancelOrder/:orderId", cancelUserOrder);



    function saveUserOrder(req,res){
        var order = req.body;
        orderModelProject
            .saveUserOrder(order)
            .then(function(order) {
                res.json(order);
            }, function (err) {
                    res.sendStatus(500).send(err);
                });
    }

    function cancelUserOrder(req,res){
        orderModelProject
            .cancelUserOrder(req.params.orderId)
            .then(function (order) {
                res.send(order);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function getUserOrders(req, res) {
        var userId = req.user;
        // var product = req.id;
        orderModelProject
            .getUserOrders(userId)
            .then(
                function(product){
                    res.send(product);
                }, function (err) {
                    res.sendStatus(500).send(err);
                }
            )}

};