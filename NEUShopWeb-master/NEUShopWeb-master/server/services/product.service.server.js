

module.exports = function (app, models) {
    var productModelProject = models.productModelProject;


        app.get('/api/project/getProducts', getProducts);
        app.post("/api/project/saveProduct",saveProduct);
        app.post("/api/project/getProductById/:productId", getProductById);



        function getProducts(req,res){
            // var product = req.body;
            productModelProject
                .getProducts()
                .then(
                    function(product){
                        res.send(product);
                    },
                    function (error) {
                        res.statusCode(400).send(error);
                    }
                )


        }

    function saveProduct(req,res){
        var product = req.body;
        productModelProject
            .saveProduct(product)
            .then(
                function(product){
                    res.send(product);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )


    }

    function getProductById(req, res) {
        var product = req.params.productId;
        // var product = req.id;
        productModelProject
            .getProductById(product)
            .then(
                function(product){
                    res.send(product);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )

    }

};