(function () {
        angular
            .module("project")
            .controller("checkoutcartController", checkoutcartController);

        function checkoutcartController($location, $rootScope, toaster, OrderService) {
            var vm = this;
            vm.total = 0;
            vm.product = $rootScope.checkoutList;
            vm.getTotal = getTotal;
            vm.deletefromCart = deletefromCart;
            vm.onqtyChange = onqtyChange;
            vm.orderProducts = orderProducts;

            function init() {
                console.log("In checkoutcartController")
            }

            init();

            function getTotal(){
                vm.total =0;
                if(vm.product!==undefined)
                for(var i = 0; i < vm.product.length; i++){
                    var product = vm.product[i];
                    vm.total += (product.sellingPrice * product.qty);
                }
            }
            vm.getTotal();
            function deletefromCart(product) {
                var productIndex = $.map($rootScope.checkoutList, function(obj, index) {
                    if(obj.productID == product.productID) {
                        return index;
                    }
                });
                if (productIndex > -1) {
                    toaster.pop('info', "Information", "Deleted item from cart");
                    $rootScope.checkoutList.splice(productIndex, 1);
                }
                vm.getTotal();

            }

            function onqtyChange(product) {
                var id = product.productID;
                $.each($rootScope.checkoutList, function() {
                    if (this.productID === id) {
                        this.qty = product.qty;
                    }
                });
                vm.getTotal();
            }

            function orderProducts()
            {
                var orderObj = {
                    orderDateTime: new Date(),
                    product: $rootScope.checkoutList,
                    user: $rootScope.currentUser._id,
                    total: vm.total
                }

                try {
                    OrderService
                        .saveUserOrder(orderObj)
                        .then(function (response) {
                                var reg = response.data;
                                if (reg) {
                                    console.log("Successful");
                                    toaster.pop('info', "Gracis", "Successfully Ordered! :)");
                                    $rootScope.checkoutList = [];
                                    vm.product =[];
                                } else {
                                    console.log("Unsuccesful");
                                    toaster.pop('error', "Error", "Error in Ordering! Please Try Again");
                                }
                            },
                            function (error) {
                                if (error.status === 400) {
                                    toaster.pop('error', "Error", "Error in Ordering! Please Try Again");
                                }
                                else {
                                    toaster.pop('error', "Error", "Error in Ordering! Please Try Again");
                                }

                            });
                }
                catch(e)
                {
                    console.log(e.message);
                }
            }
        }

    }
)();