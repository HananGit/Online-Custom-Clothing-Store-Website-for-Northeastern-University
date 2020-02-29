(function () {
    angular
        .module("project")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        var api = {
            getProducts: getProducts,
            saveProduct: saveProduct,
            getProductById: getProductById
        };

        return api;

        function getProducts() {
            return $http.get('/api/project/getProducts');
        }

        function saveProduct(product) {
            return $http.post("/api/project/saveProduct", product);
        }

        function getProductById(productId) {
            var url = "/api/project/getProductById/" + productId;
            return $http.post(url);
        }

    }

})();