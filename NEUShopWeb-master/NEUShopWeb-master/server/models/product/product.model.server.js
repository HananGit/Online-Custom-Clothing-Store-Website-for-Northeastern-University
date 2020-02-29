module.exports = function() {

    console.log("hello to product")
    var mongoose = require("mongoose");
    var q = require("q");
    //Getting the schema
    var productSchema = require("./product.schema.server.js")();
    //Creating the model of the mongodb
    var Product = mongoose.model("ProductUser", productSchema);

    var api = {
        getProducts : getProducts,
        saveProduct : saveProduct,
        getProductById: getProductById,



    };
    return api;




    function saveProduct(product) {
        return Product.create(product);
    }

    function getProductById(productId) {
        return Product.findById(productId);
    }

    function getProducts() {
        // Product.create([{productID: 1,productName: "Converse Shoes", description: "Chuck Taylor All Star Classic Colours",img: "https://www.converse.com/on/demandware.static/-/Sites-ConverseMaster/default/dw48f5fc3c/images/hi-res/M9621C_standard.png?sw=580&sh=580&sm=fit", edition: "Classic red converse edition", color:"Red", styleNo:"M9621C", costPrice:75 , sellingPrice:50 },{productID: 2,productName: "Converse Shoes", description: "Chuck Taylor All Star Classic Colours",img: "https://www.converse.com/on/demandware.static/-/Sites-ConverseMaster/default/dwec469ff7/images/hi-res/151116C_standard.jpg?sw=580&sh=580&sm=fit", edition: "Classic Neon converse edition", color:"Neon", styleNo:"M9631C", costPrice:45 , sellingPrice:40 }]);
        return Product.find();
    }






};