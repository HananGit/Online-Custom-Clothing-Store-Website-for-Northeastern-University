(function () {
        function productcardController(toaster, $rootScope) {
            var ctrl = this;

            ctrl.addtocart = function () {
                var product = ctrl.data;
                var productExists = $.grep( $rootScope.checkoutList, function( n, i ) {return n.productID == product.productID;});
                if(productExists.length ===0)
                {
                    var productObj = {
                        productID: product.productID,
                        productName: product.productName,
                        description: product.description,
                        img: product.img,
                        edition: product.edition,
                        color: product.color,
                        styleNo: product.styleNo,
                        costPrice: product.costPrice,
                        sellingPrice: product.sellingPrice,
                        qty : 1
                    }
                    $rootScope.checkoutList.push(productObj);
                    toaster.pop('info', "Information", "Item added to checkout!!");
                }
                else{
                    var id = productExists[0].productID;
                    $.each($rootScope.checkoutList, function() {
                        if (this.productID === id) {
                            this.qty = this.qty+1;
                            toaster.pop('info', "Information", "Item Already Added!! Quantity Updated -->" + this.qty);
                        }
                    });
                }

                console.log(product);
            };

            ctrl.togglefav = function (product) {
                if ($rootScope.currentUser != null) {
                    if ($rootScope.favList === undefined) {
                        $rootScope.favList = [];
                    }

                    var productIndex = $.map($rootScope.favList, function (obj, index) {
                        if (obj.productID == product.productID) {
                            return index;
                        }
                    });
                    if (productIndex.length !=0 && $rootScope.favList.length !=0 ) {
                        toaster.pop('info', "Information", "Removed from favourite list");
                        $rootScope.favList.splice(productIndex[0], 1);
                    }
                    else {
                        toaster.pop('info', "Information", "Item Added to your favourites!!");
                        $rootScope.favList.push(ctrl.data);
                    }
                }
                else {
                    toaster.pop('error', "Information", "Log In to add");
                }
            };
        }

        angular
            .module("project")
            .component("productCard", productCard());

        function productCard() {

            return {
                templateUrl: "views/product/templates/productCard.html",
                bindings: {data: '='},
                controller: productcardController,
            };

        }

    })();
